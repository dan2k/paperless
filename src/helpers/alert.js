export const errAlert=(msg,fn=null)=>{
    Swal.fire({
        title: 'แจ้งข้อผิดพลาด',
        text: msg,
        icon: 'error',
        confirmButtonText: 'ตกลง'
    }).then(fn)   
}
export const okAlert=(msg,fn=null)=>{
    Swal({
        text: msg,
        icon: 'success',
        confirmButtonText: 'ตกลง'
    }).then(fn)   
}
export const confAlert=(msg)=>{
    return Swal({
        text: msg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'ไม่',
        confirmButtonText: 'ใช่'
      })
}
