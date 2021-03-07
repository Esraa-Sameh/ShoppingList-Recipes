import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective implements OnInit {
  constructor(private renderer: Renderer2, private elRef: ElementRef) {}
  @HostBinding('class.open') isOpen: boolean = false;
  @HostListener('click') toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit() {}
}
