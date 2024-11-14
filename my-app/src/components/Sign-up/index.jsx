import {
    Box,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
} from "@mui/material";
import { forwardRef, useState } from "react";
import useHookMutation from "../../hooks/useHookMutation";
import { accountService } from "../../services/AccountService";
import RenderWithCondition from "../RenderWithCondition";

const SignUp = forwardRef(({ onClickSignIn, onSignUpSuccess }, ref) => {
    const [fullName, setFullName] = useState({ firstName: "", lastName: "" });
    const [birthDate, setBirthDate] = useState({ day: "", month: "", year: "" });
    const [gender, setGender] = useState("male");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showError, setShowError] = useState(false);
    const [messageRespon, setMessageRespon] = useState("");

    const handleFocusInput = () => {
        setShowError(false);
        setMessageRespon("");
    };

    const signUpMutation = useHookMutation((data) => {
        return accountService.signUp(data);
    });

    const { isError, isPending: isLoadingFetchSignUp } = signUpMutation;

    const handleSubmit = () => {
        if (!fullName || !birthDate || !gender || !username || !password) {
            setShowError(true);
            return;
        }

        const payload = {
            username,
            password,
            nick_name: fullName.firstName,
            full_name: `${fullName.firstName} ${fullName.lastName}`,
            gioi_tinh: gender,
            sdt: username,
            dia_chi: "",
            avatar: "",
            ngay_sinh: new Date(
                `${birthDate.year}-${birthDate.month}-${birthDate.day}`
            ).toISOString(),
        };
        signUpMutation.mutate(
            payload,
            {
                onSuccess: () => {
                    onSignUpSuccess({ username, password });
                    alert("Đăng ký thành công");
                },
                onError: (error) => {
                    setMessageRespon(error.response.data.message);
                    setShowError(true);
                }
            }
        );
    };

    return (
        <Box tabIndex={-1} ref={ref} className="flex w-1/3 bg-white flex-col p-5 rounded-xl ">
            <Box className="flex flex-col gap-1 justify-center items-center border-b border-solid border-gray-300">
                <img src="../images/pepe.jpg" alt="logo" className="h-16 rounded" />
                <span className="font-bold uppercase text-sm">Tạo tài khoản mới</span>
                <span>Nhanh chóng và dễ dàng</span>
            </Box>
            <Box mt={3} className="flex flex-col gap-3">
                <FormControl>
                    <FormLabel>Tên đầy đủ:</FormLabel>
                    <Box className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Họ"
                            value={fullName.firstName}
                            onFocus={handleFocusInput}
                            onChange={(e) =>
                                setFullName((prev) => ({ ...prev, firstName: e.target.value }))
                            }
                            className="w-1/2 p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Tên"
                            value={fullName.lastName}
                            onFocus={handleFocusInput}
                            onChange={(e) =>
                                setFullName((prev) => ({ ...prev, lastName: e.target.value }))
                            }
                            className="w-1/2 p-2 border border-gray-300 rounded"
                        />
                    </Box>
                </FormControl>
                <FormControl>
                    <FormLabel>Ngày sinh:</FormLabel>
                    <Box className="flex gap-2">
                        <input
                            type="number"
                            placeholder="Ngày sinh"
                            value={birthDate.day}
                            onFocus={handleFocusInput}
                            onChange={(e) =>
                                setBirthDate((prev) => ({ ...prev, day: e.target.value }))
                            }
                            className="w-1/2 p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="number"
                            placeholder="Tháng sinh"
                            value={birthDate.month}
                            onFocus={handleFocusInput}
                            onChange={(e) =>
                                setBirthDate((prev) => ({ ...prev, month: e.target.value }))
                            }
                            className="w-1/2 p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="number"
                            placeholder="Năm sinh"
                            value={birthDate.year}
                            onFocus={handleFocusInput}
                            onChange={(e) =>
                                setBirthDate((prev) => ({ ...prev, year: e.target.value }))
                            }
                            className="w-1/2 p-2 border border-gray-300 rounded"
                        />
                    </Box>
                </FormControl>
                <FormControl>
                    <FormLabel>Giới tính:</FormLabel>
                    <RadioGroup
                        row
                        defaultValue="Nam"
                        name="radio-buttons-gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
                        <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
                    </RadioGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Tên đăng nhập:</FormLabel>
                    <TextField
                        variant="outlined"
                        placeholder="Số điện thoại hoặc email"
                        value={username}
                        onFocus={handleFocusInput}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Mật khẩu:</FormLabel>
                    <TextField
                        type="password"
                        variant="outlined"
                        placeholder="Mật khẩu"
                        value={password}
                        onFocus={handleFocusInput}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full"
                    />
                </FormControl>
                <RenderWithCondition condition={isError && showError}>
                    <p className="text-red-500 text-start">{messageRespon ? messageRespon : "Vui lòng nhập đầy đủ thông tin"}</p>
                </RenderWithCondition>
                <div className="flex justify-center flex-col items-center gap-3">
                    <div className="relative">
                        <button
                            onClick={handleSubmit}
                            className={`bg-blue-500 text-white p-2 rounded w-1/2 px-5 w-56 relative ${isLoadingFetchSignUp && 'opacity-50'}`}
                            disabled={isLoadingFetchSignUp}
                        >
                            Đăng ký
                        </button>
                        <RenderWithCondition condition={isLoadingFetchSignUp}>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <CircularProgress size={40} color="secondary" />
                            </div>
                        </RenderWithCondition>
                    </div>
                    <button onClick={onClickSignIn} className="text-sm text-gray-500">
                        Bạn đã có tài khoản?
                    </button>
                </div>

            </Box>
        </Box>
    );
});

export default SignUp;
