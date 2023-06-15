import React from 'react';
import Button from "@mui/material/Button";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface ButtonProps {
  onClick?: () => void;
  icon?: string;
  label?: string;
  theme?: any;
  setDark: (dark: boolean) => void;
  dark: boolean;
}

const MyButton: React.FC<ButtonProps> = ({
  onClick = () => {},
  icon = "feather-plus",
  label = "button label",
  theme,
  setDark,
  dark,
}) => {

  const handleToggleDarkMode = () => {
    
    
    setDark(!dark);
  };

  return (
    <Button color="inherit" onClick={handleToggleDarkMode}>
      {dark ? <Brightness4Icon /> : <Brightness7Icon />}
    </Button>
  );
};

export default MyButton;
