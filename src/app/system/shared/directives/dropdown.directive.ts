import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector: '[paiDropdown]'
})
export class DropdownDirective {

    @HostBinding('class.open') isOpen = false;

    @HostListener('click') onclick() {
        this.isOpen = !this.isOpen;
    }
}
