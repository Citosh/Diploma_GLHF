export const ErrorMessage = ({ text }) => {
    if (!text) return null;
    return (
      <div className="profile-error-message">
        {text}
      </div>
    );
  };