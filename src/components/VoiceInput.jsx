const VoiceInput = ({ setMessages }) => {
    const handleVoiceInput = () => {
      alert("Fitur suara belum tersedia.");
    };
  
    return (
      <button className="voice-input" onClick={handleVoiceInput}>
        🎤
      </button>
    );
  };
  
  export default VoiceInput;
  