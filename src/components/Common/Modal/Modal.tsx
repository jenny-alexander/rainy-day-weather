import {useState, useLayoutEffect, useEffect} from 'react';
import { createPortal } from "react-dom";
import { ModalConfig } from "../../../ts/interfaces/modal.interface";
interface ModalProps {
    show: boolean
    setShow: (value: boolean) => void
    children: JSX.Element | JSX.Element[]
    config: ModalConfig,
    wrapperId: string,
    theme: string,
}
const Modal = ({show, setShow, config, children, wrapperId, theme} : ModalProps) : JSX.Element => {
    const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

    useEffect(() => {        
        if (portalElement) {
            portalElement.setAttribute('data-theme', theme);
        }
    },[theme]);	

    useLayoutEffect(() => {
		let element = document.getElementById(wrapperId) as HTMLElement
		let portalCreated = false;
		// if element is not found with wrapperId or wrapperId is not provided,
		// create and append to body
		if (!element) {
			element = createWrapperAndAppendToBody(wrapperId);
			portalCreated = true;
		} else {
            element.setAttribute("data-theme", theme);
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