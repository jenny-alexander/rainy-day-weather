import { createPortal } from "react-dom";
import { useEffect, useState } from 'react';

interface Props {
    children: JSX.Element
    //wrapperId: string
}

const PortalModal = ({children}: Props) => {
    const [portalElement, setPortalElement] = useState<HTMLElement | null>(null)

    useEffect(() => {
        console.log('in PortalModal with props:', children);
    },[]);

    return createPortal(children, document.body); //TODO: maybe make DOM container for portal be dynamic?
}
export default PortalModal;