import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { useLocalStorage } from '../../composables/localStorage';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public storage = useLocalStorage('theme', 'light')
  public isDark = this.storage.value() === 'dark'

  constructor() {}

  ngOnInit(): void {
    this.isDark = this.storage.value() === 'dark'
  }

  themeSwitcher() {
    const newTheme = this.isDark ? 'light' : 'dark'
    this.storage.value.set(newTheme)
    this.isDark = newTheme === 'dark'
    document.body.setAttribute('data-theme', newTheme)
  }
}