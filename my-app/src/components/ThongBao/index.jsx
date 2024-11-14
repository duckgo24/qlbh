import React, { useEffect } from 'react';
import { RiCloseLine } from "react-icons/ri";
import './thongbao.css';
import RenderWithCondition from '../RenderWithCondition';

export default function ThongBao({ type, message, className, isOpen }) {
    const [open, setOpen] = React.useState(isOpen);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        if (open) {
            const countDown = setTimeout(() => {
                setOpen(false);
            }, 3000);

            return () => clearTimeout(countDown);
        }
    }, [open]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <RenderWithCondition condition={open}>
            <div className={`thongbao fixed bottom-2 right-2 w-80 h-20 ${className} ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                <div>
                    <p>Thông báo</p>
                    <p>{message}</p>
                </div>
                <div className="count-down"></div>
                <button onClick={handleClose}>
                    <RiCloseLine size={20} />
                </button>
            </div>
        </RenderWithCondition>
    );
}
