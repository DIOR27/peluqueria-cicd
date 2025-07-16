import React from 'react';
import Input from './Input';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../../lib/utils';

export default function PasswordInput({ className, ...props }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const icon = showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />;
  const toggleButton = (
    <Button
      type="button"
      variant="ghost"
      onClick={togglePasswordVisibility}
      className="absolute right-2 top-7.5 transform  h-8 w-8 p-0"
    >
      {icon}
    </Button>
  );

  return (
    <div className='relative'>
      <Input
        type={showPassword ? 'text' : 'password'}
        id="password"
        className={cn("pr-10", className)}
        placeholder="••••••••"
        label="Contraseña"
        name="password"
        {...props}
      />
      {toggleButton}
    </div>

  );
}
