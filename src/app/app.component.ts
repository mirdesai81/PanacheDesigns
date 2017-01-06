import { Component } from '@angular/core';
import {Category} from "./category/category";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dream Bean';

  // Slide Categories
  slideCategories: Category[] = [
    { id: '1', title: 'Bakery', image: 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=1110%C3%97350&w=1100&h=350', desc: 'The best cupcakes, cookies, cakes, pies, cheesecakes, fresh bread, biscotti, muffins, bagels, fresh coffee and more.' },
    { id: '2', title: 'Takeaway', image: 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=1110%C3%97350&w=1100&h=350', desc: 'It\'s consistently excellent, dishes are superb and healthily cooked with high quality ingredients.' },
    { id: '3', title: 'Dairy', image: 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=1110%C3%97350&w=1100&h=350', desc: 'A dairy product is food produced from the milk of mammals, primarily cows, water buffaloes, goats, sheep, yaks, horses.' },
  ];

  // Card categories
  cardCategories: Category[] = [
    { id: '1', title: 'Bakery', image: 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=270%C3%97150&w=270&h=150', desc: 'The best cupcakes, cookies, cakes, pies, cheesecakes, fresh bread, biscotti, muffins, bagels, fresh coffee and more.' },
    { id: '2', title: 'Takeaway', image: 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=270%C3%97150&w=270&h=150', desc: 'It\'s consistently excellent, dishes are superb and healthily cooked with high quality ingredients.' },
    { id: '3', title: 'Dairy', image: 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=270%C3%97150&w=270&h=150', desc: 'A dairy product is food produced from the milk of mammals, primarily cows, water buffaloes, goats, sheep, yaks, horses.' },
    { id: '4', title: 'Meat', image: 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=270%C3%97150&w=270&h=150', desc: 'Only superior quality beef, lamb, and pork.' },
    { id: '5', title: 'Seafood', image: 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=270%C3%97150&w=270&h=150', desc: 'Great place to buy fresh seafood.' },
    { id: '6', title: 'Fruit & Veg', image: 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=270%C3%97150&w=270&h=150', desc: 'A variety of fresh fruits and vegetables.' },
  ];

  selectCategory(category: Category) {
    console.log('Selected category', category.title);
  }
}
