
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CircularProgress, Divider } from '@mui/material';
import { FaUser } from 'react-icons/fa';
import useHookMutation from '../hooks/useHookMutation';
import { accountService } from '../services/AccountService';
import ThongBao from '../components/ThongBao';
import { setUpdateAccount } from '../redux/slice/account.slice';
import RenderWithCondition from '../components/RenderWithCondition';

export default function ThongTinNguoiDung() {

  const { my_account } = useSelector((state) => state.account);
  const [formData, setFormData] = useState(my_account);
  const [isReqEdit, setIsReqEdit] = useState(true);
  const [thongbao, setThongBao] = useState({
    isOpen: false,
    type: "",
    message: ""
  });

  const dispatch = useDispatch();

  const handleOnInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'radio' ? value : checked ? value : formData[name],
    });
  };
  const handleClickReqEdit = () => {
    setIsReqEdit(false)
  }
  const updateUserMutation = useHookMutation((data) => {
    return accountService.updateUser(data);
  });

  const { data: dataUpdateUser, error, isSuccess, isError, isPending: isLoadingUpdateUser } = updateUserMutation;

  const handleClickUpdateUser = (e) => {
    if (formData.nick_name === '' || formData.full_name === '' || formData.dia_chi === '' || formData.sdt === '') {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }
    setIsReqEdit(true);


    updateUserMutation.mutate((formData), {
      onSuccess: (res) => {
        dispatch(setUpdateAccount(res.account));
      }
    })
  }


  return (
    <div className="bg-white py-10 mt-2">
      <div className="flex flex-col w-1/2 mx-auto gap-3">
        <div className='flex items-center gap-3'>
          <FaUser size={20} />
          <p className='font-bold text-xl'>Hồ sơ của tôi</p>
        </div>
        <p className='text-lg'>Quản lý thông tin của tôi </p>
        <Divider />
      </div>
      <div className='flex flex-col text-base gap-5 w-1/2 mx-auto mt-3'>
        <div className='flex items-center flex-1'>
          <label className='w-32'>Username:</label>
          <input disabled={isReqEdit} onChange={handleOnInputChange} value={formData?.nick_name} name="nick_name" type="text" placeholder="Tên danh mục" className="border-2 border-gray-300 p-2 outline-none text-base rounded-2xl flex-1" />
        </div>
        <div className='flex items-center flex-1'>
          <label className='w-32'>Tên người dùng:</label>
          <input disabled={isReqEdit} onChange={handleOnInputChange} value={formData?.full_name} name="full_name" type="text" placeholder="Tên người dùng" className="border-2 border-gray-300 p-2 outline-none text-base rounded-2xl flex-1" />
        </div>
        <div className='flex flex-3 gap-2'>
          <p className='w-32'>Giới tính :</p>

          <div className='flex gap-2 items-center'>
            <lable>Nam</lable>
            <input
              type="radio"
              name="gioi_tinh"
              value="Nam"
              checked={formData?.gioi_tinh === 'Nam'}
              onChange={handleOnInputChange}
              disabled={isReqEdit}
              className="h-4 w-4"
            />
          </div>
          <div className='flex gap-2 items-center'>
            <lable>Nữ</lable>
            <input
              type="radio"
              name="gioi_tinh"
              value="Nữ"
              checked={formData?.gioi_tinh === 'Nữ'}
              onChange={handleOnInputChange}
              disabled={isReqEdit}
              className="h-4 w-4"
            />
          </div>
        </div>
        <div className='flex items-center flex-1'>
          <label className='w-32'>Địa chỉ: </label>
          <input disabled={isReqEdit} onChange={handleOnInputChange} value={formData?.dia_chi} name="dia_chi" type="text" placeholder="Địa chỉ" className="border-2 border-gray-300 p-2 outline-none text-base rounded-2xl flex-1" />
        </div>
        <div className='flex items-center flex-1'>
          <label className='w-32'>Số điện thoại: </label>
          <input disabled={isReqEdit} onChange={handleOnInputChange} name="sdt" value={formData?.sdt} type="text" placeholder="Số điện thoại" className="border-2 border-gray-300 p-2 outline-none text-base rounded-2xl flex-1" />
        </div>
        <div className='flex items-center flex-1'>
          <label className='w-32'>Ngày sinh: </label>
          <input disabled={isReqEdit} onChange={handleOnInputChange} name="ngay_sinh" type="date" value={new Date(formData?.ngay_sinh).toISOString().split('T')[0]} placeholder="Số điện thoại" className="border-2 border-gray-300 p-2 outline-none text-base rounded-2xl flex-1" />
        </div>
        <RenderWithCondition condition={error && isError}>
          <p className="text-red-500 text-start">
            {error?.message}
          </p>
        </RenderWithCondition>
        <RenderWithCondition condition={isSuccess}>
          <p className="text-red-500 text-start">
            {dataUpdateUser?.message}
          </p>
        </RenderWithCondition>

        <div className="relative">
          <button
            onClick={isReqEdit ? handleClickReqEdit : handleClickUpdateUser}
            className={`bg-orange-400 flex items-center justify-center min-w-32 py-2 px-3 rounded-lg text-white text-base float-right ${isLoadingUpdateUser && 'opacity-45'}`}
          >
            {isLoadingUpdateUser ? (
              <>
                <p>Đang cập nhật....</p>
                <CircularProgress className="absolute -translate-x-1/2 -translate-y-1/2" size={40} color="secondary" />
              </>
            ) : (
              <p>{isReqEdit ? "Sửa" : "Lưu"}</p>
            )}
            <RenderWithCondition condition={isLoadingUpdateUser}>
              <CircularProgress className="absolute -translate-x-1/2 -translate-y-1/2" size={40} color="secondary" />
            </RenderWithCondition>
          </button>

        </div>

      </div>
      <ThongBao isOpen={thongbao.isOpen} type={thongbao.type} message={thongbao.message} />
    </div>
  )
}
