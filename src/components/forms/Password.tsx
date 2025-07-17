import {useState} from 'react';
import {FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface PasswordFormProps {
    password: string;
    setPassword: (password: string) => void;
    errors: string[];
    setErrors: (errors: string[]) => void;
}

const validatePassword = (password: string) => {
    const errors: string[] = [];

    if (password.length < 8) errors.push("Password must be at least 8 characters long.");
    if (!/[A-Z]/.test(password)) errors.push("Password must contain at least one uppercase letter.");
    if (!/[a-z]/.test(password)) errors.push("Password must contain at least one lowercase letter.");
    if (!/[0-9]/.test(password)) errors.push("Password must contain at least one number.");

    // if (!/[!@#$%^&*()_+{}\[\]:;"'<>,.?~\\/-]/.test(password))
    //     errors.push("Password must contain at least one special character.");

    return errors;
};

export default function PasswordForm({password, setPassword, errors, setErrors}: PasswordFormProps) {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = event.target.value;
        const validationErrors = validatePassword(newPassword);
        setErrors(validationErrors);
        setPassword(newPassword);
    };

    return (
        <FormControl variant="outlined" fullWidth error={errors.length > 0}>
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                        </IconButton>
                    </InputAdornment>
                }
                label="Password"
            />
            {errors.length > 0 && (
                <FormHelperText>{errors.join(', ')}</FormHelperText>
            )}
        </FormControl>
    );
}