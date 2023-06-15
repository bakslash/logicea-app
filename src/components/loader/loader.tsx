import React from "react";



interface LoaderProps {
  loading: boolean;
  text?: string;
}

const Loader: React.FC<LoaderProps> = ({ text = "Just a moment..." }) => {
  return (
    <>

      <div className="loader"> </div>
      <p>{text}</p>

    </>
  );
}

export default Loader;
