import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public isDark: boolean = false

  ngOnInit(): void {
    const storedTheme = localStorage.getItem('theme')
    this.isDark = storedTheme === 'dark'
    document.body.setAttribute('data-theme', this.isDark ? 'dark' : 'light')
  }

  themeSwitcher(): void {
    this.isDark = !this.isDark
    document.body.setAttribute('data-theme', this.isDark ? 'dark' : 'light')
    localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
  }
}