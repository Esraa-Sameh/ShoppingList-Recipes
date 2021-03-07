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
  @HostListener('document:click', ['$event']) toggleDropdown(event: Event) {
      console.log(this.elRef.nativeElement.contains(event.target))
    this.isOpen = this.elRef.nativeElement.contains(event.target)? !this.isOpen : false;
  }

  ngOnInit() {}
}
