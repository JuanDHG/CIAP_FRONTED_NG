import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// export const vigilanteDobleGuard: CanActivateFn = (route, state) => {
//   return true;
// };

export const LoginGuard = () => {
    const router = inject(Router);
    var local = localStorage.getItem('dataUSer')
    console.log(local);
    
    if (local != '' || local !=null || local != undefined) {
        return true
    }else{
        router.navigate(['/auth/login']);
        return false;
    }
};