import { Injectable } from '@angular/core';
import { visitAstChildren } from '@angular/compiler';

// tslint:disable-next-line: class-name
export interface userelement {
    email?: string;
    uid?: string;
    displayName?: string;
    photoURL?: string;
}

@Injectable()
export class UserService {
    constructor() {}
}
