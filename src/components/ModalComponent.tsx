import React from 'react';
import { Monster } from '../types/model';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  monster?: Monster; 
  children?: React.ReactNode;
}

const ModalComponent: React.FC<ModalProps> = ({ isOpen, onClose, monster }) => {
  if (!isOpen) return null;

  const getImagePath = (name: string): string => {
    const imageName = name.replace(/\s+/g, '').replace(/'/g, '');
    return `/monsters-large/${imageName}.png`; 
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={handleBackgroundClick}>
      <div className="bg-white p-5 rounded-lg max-w-md mx-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="float-right font-bold">X</button>
        {monster && (
          <>
            <img src={getImagePath(monster.name)} alt={monster.name} className="w-full h-auto mb-4" />
            <h2 className="text-2xl font-bold">{monster.name}</h2>
            <p>{monster.description}</p>
            {monster.weaknesses && (
              <>
                <h3 className="font-semibold">Weaknesses:</h3>
                <ul>
                  {monster.weaknesses.map((weakness, index) => (
                    <li key={index}>{weakness.element} - {weakness.stars} stars</li>
                  ))}
                </ul>
              </>
            )}
            {/* Resistances */}
            {monster.resistances && (
              <>
                <h3 className="font-semibold">Resistances:</h3>
                <ul>
                  {monster.resistances.map((resistance, index) => (
                    <li key={index}>
                      {resistance.element}
                      {resistance.condition ? ` - ${resistance.condition}` : ''}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ModalComponent;
