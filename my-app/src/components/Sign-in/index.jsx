import { CircularProgress, FormControl, FormLabel, TextField } from "@mui/material";
import { forwardRef, useState } from "react";
import useHookMutation from "../../hooks/useHookMutation";
import { accountService } from "../../services/AccountService";
import Cookie from 'js-cookie';
import { useDispatch } from "react-redux";
import { setLogin, setMyAccount } from "../../redux/slice/account.slice";
import RenderWithCondition from "../RenderWithCondition";
import { useNavigate } from "react-router-dom";

const SignIn = forwardRef(({ onClickSignUp, onLoginSuccess }, ref) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChangeInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setShowError(false);
    };

    const [thongBao, setThongBao] = useState();

    const handleFocusInput = () => {
        setShowError(false);
    };

    const loginMutation = useHookMutation(async () => {
        const { username, password } = formData;
        return accountService.signIn(username, password);
    });

    const { error, isError, isPending: isLoadingFetchSignIn } = loginMutation;

    const handleSignIn = () => {
        loginMutation.mutate(undefined, {
            onError: () => {
                setShowError(true);
                setThongBao('Tài khoản hoặc mật khẩu không chính xác');
            },
            onSuccess: (data) => {
                const { access_token, refresh_token, account } = data;
                if (account.isBan) {
                    setThongBao('Tài khoản của bạn đã bị khóa');
                    setShowError(true);
                    return;
                }
                onLoginSuccess(data);
                Cookie.set('access_token', access_token, { expires: 1, path: '/' });
                Cookie.set('refresh_token', refresh_token, { expires: 365, path: '/' })

               
                dispatch(setMyAccount(account));
                if (account?.isAdmin) {
                    navigate('/admin');
                }

            }
        });
    };

    return (
        <div ref={ref} tabIndex={-1} className="flex w-1/3 bg-white flex-col p-5 rounded-xl">
            <div className="flex flex-col gap-1 justify-center items-center border-b border-solid border-gray-300">
                <img src="../images/pepe.jpg" alt="logo" className="h-16 rounded" />
                <span className="font-bold uppercase text-sm">Đăng nhập hệ thống</span>
            </div>
            <div mt={3} className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                    <FormControl>
                        <FormLabel>Tên đăng nhập:</FormLabel>
                        <TextField
                            variant="outlined"
                            placeholder="Số điện thoại hoặc email"
                            name="username"
                            autoFocus
                            className="w-full"
                            value={formData.username}
                            onChange={handleChangeInput}
                            onFocus={handleFocusInput}
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Mật khẩu:</FormLabel>
                        <TextField
                            type="password"
                            name="password"
                            variant="outlined"
                            placeholder="Mật khẩu"
                            className="w-full"
                            value={formData.password}
                            onChange={handleChangeInput}
                            onFocus={handleFocusInput}
                        />
                    </FormControl>
                    {thongBao && showError && (
                        <div className="text-red-500 text-start">
                            {thongBao}
                        </div>
                    )}
                </div>
                <div mt={2} className="flex justify-center flex-col items-center gap-3">
                    <div className="relative">
                        <button onClick={handleSignIn} className={`bg-blue-500 text-white p-2 rounded w-1/2 px-5 w-56 relative ${isLoadingFetchSignIn && 'opacity-50'}`}>Đăng nhập</button>
                        <RenderWithCondition condition={isLoadingFetchSignIn}>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <CircularProgress size={40} color="secondary" />
                            </div>
                        </RenderWithCondition>
                    </div>
                    <button onClick={onClickSignUp} className="text-sm text-gray-500">Bạn chưa có tài khoản?</button>
                </div>
            </div>
        </div>
    );
});

export default SignIn;
