import React, { useState } from 'react';

const ColorPicker = ({ onColorChange }) => {
    const [selectedColor, setSelectedColor] = useState(null);

    const handleColorClick = (color) => {
        setSelectedColor(color);
        onColorChange(color?.name); // Llamamos a la función del padre
    };


    const colors = [
        { name: 'red', value: 'red-900' },
        { name: 'yellow', value: 'yellow-400' },
        { name: 'green', value: 'green-900' },
        { name: 'blue', value: 'blue-900' },
        { name: 'black', value: 'black' },
        { name: 'lime', value: 'lime' },
        { name: 'gray', value: 'gray-600' },
        { name: 'purple', value: 'purple-800' },
        { name: 'pink', value: 'pink-600' },
        { name: 'cyan', value: 'cyan-600' },
    ]



    return (
        <div className="flex content-center w-full gap-2 pt-2 h-9">
            {colors.map(color => (
                <div
                    key={color?.name}
                    className={`w-6 h-6 ${selectedColor?.value === color?.value ? 'border-2 border-black' : ''}`}
                    onClick={() => handleColorClick(color)}
                    style={{
                        cursor: 'pointer',
                        boxShadow: selectedColor?.value === color?.value ? '0px 0px 8px rgba(0, 0, 0, 0.5)' : 'none',
                        backgroundColor: color.name
                    }}
                ></div>
            ))}
        </div>
    )
}

export default ColorPicker;
