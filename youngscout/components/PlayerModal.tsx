import React, { useEffect, useState } from 'react';
import { Player, UserRole } from '../types';
import { POPULAR_TAGS } from '../constants';

interface PlayerModalProps {
  player: Player;
  onClose: () => void;
  onOpenUploadModal: () => void;
  onUpdatePlayer: (updatedPlayer: Player) => void;
  userRole: UserRole;
  onInitiateContact: (player: Player) => void;
  isContacted: boolean;
}

const StatItem: React.FC<{ label: string; value: string | number; unit?: string }> = ({ label, value, unit }) => (
    <div className="bg-gray-800/50 p-3 rounded-lg text-center">
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-xl font-bold text-white">
            {value} <span className="text-base font-normal text-gray-300">{unit}</span>
        </p>
    </div>
);

const UploadIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5 mr-2" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
);

const EditIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5 mr-2" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
);

const ContactIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5 mr-2" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
    </svg>
);


export const PlayerModal: React.FC<PlayerModalProps> = ({ player, onClose, onOpenUploadModal, onUpdatePlayer, userRole, onInitiateContact, isContacted }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editablePlayer, setEditablePlayer] = useState<Player>(player);
  const [tagInput, setTagInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const canEdit = userRole === UserRole.Talent;
    
  useEffect(() => {
    setEditablePlayer(player);
    setIsEditing(false);
  }, [player]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditablePlayer(prev => ({ ...prev, [name]: value, }));
  };

  const handleNumericInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditablePlayer(prev => ({ ...prev, [name]: value === '' ? 0 : parseInt(value, 10), }));
  };

  const handleSave = () => {
    onUpdatePlayer(editablePlayer);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditablePlayer(player);
    setIsEditing(false);
  };

  const bioCharLimit = 500;
  const bioLength = editablePlayer.bio.length;
  const counterColor = bioLength >= bioCharLimit ? 'text-red-500' : bioLength > bioCharLimit * 0.9 ? 'text-yellow-500' : 'text-gray-500';

  const handleRemoveTag = (tagToRemove: string) => {
    setEditablePlayer(prev => ({ ...prev, tags: prev.tags.filter(tag => tag !== tagToRemove), }));
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { setTagInput(e.target.value); };

  const handleAddTag = (tagToAdd: string) => {
      const trimmedTag = tagToAdd.trim();
      if (trimmedTag && !editablePlayer.tags.includes(trimmedTag) && editablePlayer.tags.length < 5) {
          setEditablePlayer(prev => ({ ...prev, tags: [...prev.tags, trimmedTag], }));
      }
      setTagInput('');
      setShowSuggestions(false);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasteData = e.clipboardData.getData('text');
      const pastedTags = pasteData.split(/[,;]/).map(tag => tag.trim()).filter(Boolean);

      setEditablePlayer(prev => {
          const existingTags = new Set(prev.tags);
          const newTags = pastedTags.filter(tag => !existingTags.has(tag));
          const combinedTags = [...prev.tags, ...newTags].slice(0, 5);
          return { ...prev, tags: combinedTags };
      });
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || e.key === ',') {
          e.preventDefault();
          handleAddTag(tagInput);
      }
  };

  const filteredSuggestions = POPULAR_TAGS.filter(
      suggestion =>
          suggestion.toLowerCase().includes(tagInput.toLowerCase()) &&
          !editablePlayer.tags.includes(suggestion)
  );

  return (
    <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
        onClick={onClose}
    >
      <div 
        className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-700 transform animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-2 sticky top-0 bg-gray-900 z-10 flex justify-end">
             <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors" aria-label="Kapat">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        <div className="p-6 pt-0 md:flex md:space-x-8">
            <div className="md:w-1/2 flex-shrink-0">
                 <div className="aspect-w-16 aspect-h-9 mb-4">
                    <video key={player.videoUrl} src={player.videoUrl} controls autoPlay muted loop className="w-full h-full object-cover rounded-lg">
                        Tarayıcınız video etiketini desteklemiyor.
                    </video>
                 </div>
                 <div className="text-center md:text-left">
                     <h2 className="text-3xl font-bold text-white mb-1">{player.name}</h2>
                     <p className="text-xl font-semibold text-brand-primary">{player.position}</p>
                      <div className="flex items-center justify-center md:justify-start gap-2 mt-2">
                        <img src={`https://flagcdn.com/w20/${player.countryCode}.png`} alt={player.country} className="w-6 h-auto rounded-sm"/>
                        <p className="text-gray-300">{player.country}</p>
                    </div>
                 </div>
                 <div className="mt-6 text-center md:text-left">
                    {canEdit ? (
                        isEditing ? (
                            <div className="flex gap-4">
                                <button onClick={handleSave} className="inline-flex items-center justify-center bg-brand-primary text-white font-bold py-2 px-6 rounded-lg transition-colors hover:bg-green-500">Kaydet</button>
                                <button onClick={handleCancel} className="inline-flex items-center justify-center bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors hover:bg-gray-500">İptal</button>
                            </div>
                        ) : (
                            <div className="flex flex-col sm:flex-row gap-4">
                                 <button onClick={() => setIsEditing(true)} className="inline-flex items-center justify-center bg-gray-700 text-white font-bold py-2 px-6 rounded-lg transition-colors hover:bg-gray-600"><EditIcon />Profili Düzenle</button>
                                <button onClick={onOpenUploadModal} className="inline-flex items-center justify-center bg-brand-primary text-white font-bold py-2 px-6 rounded-lg transition-colors hover:bg-green-500"><UploadIcon />Yeni Video Yükle</button>
                            </div>
                        )
                    ) : (
                        <button 
                            onClick={() => onInitiateContact(player)}
                            disabled={isContacted}
                            className="inline-flex items-center justify-center bg-brand-primary text-white font-bold py-2 px-6 rounded-lg transition-colors hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            <ContactIcon /> {isContacted ? 'İletişim Kuruldu' : 'İletişime Geç'}
                        </button>
                    )}
                 </div>
            </div>

            <div className="md:w-1/2 mt-6 md:mt-0">
                 <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-2 mb-4">Oyuncu Detayları</h3>
                 <div className="grid grid-cols-3 gap-4 mb-6">
                    <StatItem label="Yaş" value={player.age} />
                    {isEditing && canEdit ? (
                        <>
                            <div className="text-center">
                                <label className="text-sm text-gray-400 block mb-1">Boy</label>
                                <div className="relative">
                                    <input type="number" name="height" value={editablePlayer.height} onChange={handleNumericInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 pr-10 text-white text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary"/>
                                    <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 text-lg">cm</span>
                                </div>
                            </div>
                            <div className="text-center">
                                <label className="text-sm text-gray-400 block mb-1">Kilo</label>
                                <div className="relative">
                                    <input type="number" name="weight" value={editablePlayer.weight} onChange={handleNumericInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 pr-10 text-white text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-brand-primary" />
                                    <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400 text-lg">kg</span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <StatItem label="Boy" value={player.height} unit="cm" />
                            <StatItem label="Kilo" value={player.weight} unit="kg" />
                        </>
                    )}
                 </div>
                 <div className="mb-6">
                    <h4 className="font-semibold text-gray-300 mb-2">Yetenek Skoru</h4>
                    <div className="w-full bg-gray-700 rounded-full h-4">
                        <div className="bg-brand-primary h-4 rounded-full flex items-center justify-end" style={{ width: `${player.talentScore}%` }}><span className="text-xs font-bold text-white pr-2">{player.talentScore}</span></div>
                    </div>
                 </div>

                <div className="mb-6">
                    {isEditing && canEdit ? (
                        <div>
                             <textarea name="bio" value={editablePlayer.bio} onChange={handleInputChange} className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-primary" rows={4} maxLength={bioCharLimit}/>
                            <div className={`text-right text-xs ${counterColor} mt-1 transition-colors duration-300`}>{bioLength} / {bioCharLimit}</div>
                        </div>
                    ) : (
                        <p className="text-gray-300 leading-relaxed">{player.bio}</p>
                    )}
                </div>

                 <div>
                    <h4 className="font-semibold text-gray-300 mb-2">Anahtar Yetenekler</h4>
                     {isEditing && canEdit ? (
                        <div className="relative">
                            <div className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white flex flex-wrap items-center gap-2 focus-within:ring-2 focus-within:ring-brand-primary" onFocus={() => setShowSuggestions(true)} onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}>
                                {editablePlayer.tags.map(tag => (
                                    <span key={tag} className="bg-brand-primary/80 text-white text-sm font-medium px-3 py-1 rounded-full flex items-center gap-2">
                                        {tag}
                                        <button type="button" onClick={() => handleRemoveTag(tag)} className="font-bold text-white/70 hover:text-white leading-none pb-px" aria-label={`"${tag}" etiketini kaldır`}>&times;</button>
                                    </span>
                                ))}
                                <input type="text" placeholder={editablePlayer.tags.length < 5 ? "Yetenek ekleyin..." : "Maksimum etiket"} value={tagInput} onChange={handleTagInputChange} onKeyDown={handleTagInputKeyDown} onPaste={handlePaste} className="bg-transparent outline-none flex-grow min-w-[120px]" disabled={editablePlayer.tags.length >= 5} aria-controls="tag-suggestions" aria-expanded={showSuggestions && filteredSuggestions.length > 0} />
                            </div>
                            {showSuggestions && filteredSuggestions.length > 0 && editablePlayer.tags.length < 5 && (
                                <div id="tag-suggestions" role="listbox" className="absolute z-20 w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg max-h-48 overflow-y-auto">
                                    {filteredSuggestions.map(suggestion => (
                                        <div key={suggestion} role="option" aria-selected="false" onMouseDown={() => handleAddTag(suggestion)} className="px-4 py-2 text-white cursor-pointer hover:bg-brand-primary/20">{suggestion}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {player.tags.length > 0 ? player.tags.map(tag => (
                                <span key={tag} className="bg-brand-primary/20 text-brand-primary text-sm font-medium px-3 py-1 rounded-full">{tag}</span>
                            )) : <p className="text-sm text-gray-500">Henüz yetenek etiketi eklenmemiş.</p>}
                        </div>
                    )}
                 </div>
            </div>
        </div>
      </div>
      <style>{`
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        .animate-scale-in { animation: scaleIn 0.3s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
};