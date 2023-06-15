import React, { ReactNode } from "react";
import { Card, CardContent, Typography } from "@mui/material";

type CardProps = {
  title: string;
  children: ReactNode;
};

const CustomCard = ({ title, children }: CardProps) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {children}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
