import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import ColorPicker from './ColorPicker';
import { MdSave } from "react-icons/md";

const PlaceForm = ({ isOpen, onClose, onSubmit, place, onUpdate, onDelete }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [color, setColor] = useState('');
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedName, setSelectedName] = useState('')
    const [selectedDescription, setSelectedDescription] = useState('')

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };


    useEffect(() => {
        if (place) {
            setName(selectedName);
            setDescription(selectedDescription);
            setColor(selectedColor);
        }
    }, [place, selectedColor, selectedName, selectedDescription]);


    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({
            ...place, // Incluye las coordenadas
            id: new Date(),
            name,
            description,
            color,
        });
    };




    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Place Form"
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '400px',
                    height: '310px'

                }
            }}
        >
            {/* Form fields for name, description, color, and icon */}
            <span className='flex justify-center pb-2 mb-4 font-semibold border-b-2 border-slate-500'>Save Your Place</span>
            <form className='flex flex-col'>
                <div className='flex flex-col gap-3 p-1'>
                    <div className='flex flex-row gap-2'>
                        <span>Name</span>
                        <input type='text' name='name' className='w-full border-2 rounded-md border-slate-500' onChange={(e) => setSelectedName(e.target.value)} />
                    </div>
                    <div className='flex flex-col gap-2 mb-2'>
                        <span>Description</span>
                        <textarea type='text' name='description' rows="2" cols="50" className='w-full border-2 rounded-md border-slate-500' onChange={(e) => setSelectedDescription(e.target.value)} />
                    </div>
                </div>
                <ColorPicker onColorChange={handleColorChange} />
                <button onClick={handleSubmit} className='flex pt-4 text-[30px] text-blue-500'><MdSave /></button>
            </form>

        </Modal>
    );
};

export default PlaceForm;