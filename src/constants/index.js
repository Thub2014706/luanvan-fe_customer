import { toast } from "react-toastify";

export const standardAge = [
    'P - Thích hợp cho mọi độ tuổi',
    'K - Người xem dưới 13 tuổi với điều kiện xem cùng cha mẹ hoặc người giám hộ',
    'T13 - Cấm người dưới 13 tuổi',
    'T16 - Cấm người dưới 16 tuổi',
    'T18 - Cấm người dưới 18 tuổi',
    'C - Phim không được phép phổ biến',
];

export const signAge = [
    'P',
    'K',
    'T13',
    'T16',
    'T18',
    'C',
];

export const typeRoom = [
    '2D',
    '3D',
    'IMAX',
    // 'T16 - Cấm người dưới 16 tuổi',
];

export const typeSeat = [
    'Ghế thường',
    'Ghế VIP',
    'Ghế Couple',
];

export const typeSeatEnum = {
    0: 'Ghế thường',
    1: 'Ghế VIP',
    2: 'Ghế Couple',
};

export const showToast = (message, type) => {
    toast(message, {
        position: 'top-center',
        autoClose: 2000,
        type: type,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
};

export const timePrice = {
    0: 'Thứ 2 đến thứ 5 trước 17h',
    1: 'Thứ 2 đến thứ 5 sau 17h',
    2: 'Thứ 6 đến chủ nhật trước 17h',
    3: 'Thứ 6 đến chủ nhật sau 17h',
};

export const typeUserPrice = {
    0: 'Học sinh, sinh viên',
    1: 'Người lớn',
    2: 'Người già, trẻ em',
    3: 'Thành viên, vé trực tuyến',
};

export const typeSurcharge = {
    0: '3D',
    1: 'IMAX',
    2: 'Ghế VIP',
    3: 'Ghế Couple',
};

export const typeShowTime = {
    0: 'Theo lịch',
    1: 'Chiếu sớm',
};

export const statusShowTime = {
    0: 'Đã chiếu',
    1: 'Đang chiếu',
    2: 'Sắp chiếu',
};

export const nameDay = {
    0: 'Chủ nhật',
    1: 'Thứ 2',
    2: 'Thứ 3',
    3: 'Thứ 4',
    4: 'Thứ 5',
    5: 'Thứ 6',
    6: 'Thứ 7',
};

export const allTranslate = ['Phụ đề', 'Lồng tiếng', 'Thuyết minh'];

export const typePay = {
    0: 'Chờ thanh toán',
    1: 'Thanh toán thành công',
    2: 'Thanh toán không thành công',
}