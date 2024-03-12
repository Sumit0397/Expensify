import ReactDom from 'react-dom';
import classes from './Modal.module.css';
import { Fragment, useContext } from 'react';
import ThemeContext from '../../Context/theme-context';

const Backdrop = (props) => {
    return (<div className={classes.backdrop} onClick={props.onClose}/>)
}

const ModalOverlay = (props) => {
    const themeCtx = useContext(ThemeContext);

    return (
        <div className={classes.modal} style={{backgroundColor : themeCtx.theme === "light" ? "#0066b2" : "rgb(54, 69, 79)"}}>
            <div className={classes.content}>{props.children}</div>
        </div>
    )
}

const portalElement = document.getElementById('editmodal');

const Modal = (props) => {
    return(
        <Fragment>
            {ReactDom.createPortal(<Backdrop onClose={props.onClose}/>,portalElement)}
            {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
        </Fragment>
    )
}

export default Modal
