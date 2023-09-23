export const ErrorMessage = ({ className ,text }) => {
    if (!text) return null;
    return (
      <div className={className}>
        {text}
      </div>
    );
  };