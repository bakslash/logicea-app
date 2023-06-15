import React, { MouseEvent } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

interface ReusableButtonProps extends ButtonProps {
  label: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ReusableButton: React.FC<ReusableButtonProps> = ({
  label,
  onClick,
  color,
  ...rest
}) => {
  return (
    <Button variant="contained" color={color} onClick={onClick} {...rest}>
      {label}
    </Button>
  );
};

export default ReusableButton;
