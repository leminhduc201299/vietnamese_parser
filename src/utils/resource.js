const Resource = {
    VN: {
        boolean: {
            yaes: 'Nam',
            female: 'Nữ',
        },
        deleteEmployee: {
            deleteConfirm: `Bạn có chắc chắn muốn xóa giáo viên đang chọn không?`,
            multiDeleteConfirm: `Bạn có chắc chắn muốn xóa những giáo viên đang chọn không?`,
            deleteSuccess: 'Xóa giáo viên thành công'
        },
        addEmployee: {
            addSuccess: 'Thêm giáo viên thành công',
            closeConfirm: "Dữ liệu đã bị thay đổi, bạn có muốn lưu lại không?"
        },
        editEmployee: {
            editSuccess: 'Sửa giáo viên thành công'
        },
        validate: {
            fullNameEmpty: 'Họ và tên không được bỏ trống',
            teacherCodeEmpty: 'Số hiệu cán bộ không được bỏ trống',
            teacherCodeInvalid: 'Số hiệu cán bộ phải kết thúc bằng số',
            emailInvalid: 'Định dạng email không đúng',
            leavingDateInvalid: 'Định dạng ngày nghỉ việc không đúng',
            leavingDateSoMuch: "Ngày nghỉ việc không được lớn hơn ngày hiện tại",
        },
        response: {
            success: 'Thực hiện hành động thành công',
            warning: 'Có sự cố xảy ra, vui lòng kiểm tra lại',
            error: 'Có lỗi xảy ra, vui lòng kiểm tra lại'
        },
        toastType: {
            success: 'Thành công',
            warning: 'Cảnh báo',
            error: 'Lỗi'
        },
        save: 'Lưu',
        close: 'Đóng',
        delete: 'Xóa',
        pageSize: 'dòng/trang',
        excelFileName: 'Danh_sach_can_bo_giao_vien.xlsx',
    },

    EN: {
        gender: {
            male: 'Male',
            female: 'Female',
            other: 'Other'
        },
        deleteEmployee: {
            deleteConfirm: `Are you sure you want to delete selected teacher?`,
            multiDeleteConfirm: `Are you sure you want to delete selected teachers?`,
            deleteSuccess: 'Delete teacher successfully'
        },
        addEmployee: {
            addSuccess: 'Add teacher successfully',
            closeConfirm: "The data has been changed, do you want to save it?"
        },
        editEmployee: {
            editSuccess: 'Edit teacher successfully'
        },
        validate: {
            fullNameEmpty: 'Full name can not be empty',
            teacherCodeEmpty: 'Teacher code can not be empty',
            teacherCodeInvalid: 'Teacher code must end with a digit',
            emailInvalid: 'Email format is incorrect',
            leavingDateInvalid: 'Leaving date format is incorrect',
            leavingDateSoMuch: "The leave date cannot be greater than the current date",
        },
        response: {
            success: 'Take action successfully',
            warning: 'Something went wrong, please check again',
            error: 'An error occurred, please check again'
        },
        toastType: {
            success: 'Success',
            warning: 'Warning',
            error: 'Error'
        },
        save: 'Save',
        close: 'Close',
        delete: 'Delete',
        pageSize: 'line/page',
        excelFileName: 'Danh_sach_can_bo_giao_vien.xlsx',
    }
}

export default Resource;