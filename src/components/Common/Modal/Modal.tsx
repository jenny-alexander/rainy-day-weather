import {useState, useLayoutEffect, useCallback, useRef, useEffect} from 'react';
import { createPortal } from "react-dom";
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { ModalConfig } from "../../../ts/interfaces/modal.interface";
interface ModalProps {
    show: boolean
    setShow: (value: boolean) => void
    children: JSX.Element | JSX.Element[]
    config: ModalConfig,
    wrapperId: string,
}

const Modal = ({show, setShow, config, children, wrapperId} : ModalProps) : JSX.Element => {
    const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);
    const modalRef = useRef<HTMLDivElement>(null)

	// handle what happens on click outside of modal
	const handleClickOutside = () => setShow(false)

	// handle what happens on key press
	const handleKeyPress = useCallback((event: KeyboardEvent) => {
		if (event.key === "Escape") setShow(false)
	}, [])

	useOnClickOutside(modalRef, handleClickOutside)

	useEffect(() => {
		if (show) {
			// attach the event listener if the modal is shown
			document.addEventListener("keydown", handleKeyPress)
			// remove the event listener
			return () => {
				document.removeEventListener("keydown", handleKeyPress)
			}
		}
	}, [handleKeyPress, show])

    useLayoutEffect(() => {
		let element = document.getElementById(wrapperId) as HTMLElement
		let portalCreated = false;
		// if element is not found with wrapperId or wrapperId is not provided,
		// create and append to body
		if (!element) {
			element = createWrapperAndAppendToBody(wrapperId);
			portalCreated = true;
		}

		setPortalElement(element);

		// cleaning up the portal element
		return () => {
			// delete the programatically created element
			if (portalCreated && element.parentNode) {
				element.parentNode.removeChild(element);
			}
		}
	}, [wrapperId])

    const createWrapperAndAppendToBody = (elementId: string) => {
		const element = document.createElement("div");
		element.setAttribute("id", elementId);
        // element.style.boxSizing = "border-box";
		document.body.appendChild(element);
		return element
	}
    if (!portalElement) return null as any;
    return (
        <>
        { show  && (             
                createPortal(children, portalElement)                                                    
            )}
        </>)
}

export default Modal;