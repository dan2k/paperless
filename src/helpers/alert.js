export const errAlert=(msg,fn=null)=>{
    Swal.fire({
        title: 'แจ้งข้อผิดพลาด',
        html: msg,
        icon: 'error',
        confirmButtonText: 'ตกลง',
        backdrop:true,
        allowOutsideClick: false,
    }).then(fn)   
}
export const okAlert=(msg,fn=null)=>{
    Swal({
        html: msg,
        icon: 'success',
        confirmButtonText: 'ตกลง',
        backdrop:true,
        allowOutsideClick: false,
    }).then(fn)   
}
export const confAlert=(msg)=>{
    return Swal({
        html: msg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'ไม่',
        confirmButtonText: 'ใช่',
        backdrop:true,
        allowOutsideClick: false,
      })
}
