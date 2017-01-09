import {Injectable} from '@angular/core'

export class Category {
  id : string;
  title : string;
  desc : string;
  imageL : string;
  imageS : string;
}

class CategoryNotFoundException extends Error {
  constructor(message? : string) {
    super(message);
  }
}

@Injectable()
export class CategoryService {
  // Slide Categories
  categories: Category[] = [
  { id: '1', title: 'Bread & Bakery',
    imageL: 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=1110%C3%97350&w=1100&h=350',
    imageS: 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=270%C3%97150&w=270&h=150',
    desc: 'The best cupcakes, cookies, cakes, pies, cheesecakes, fresh bread, biscotti, muffins, bagels, fresh coffee and more.' },
  { id: '2', title: 'Takeaway',
    imageL: 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=1110%C3%97350&w=1100&h=350',
    imageS: 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=270%C3%97150&w=270&h=150',
    desc: 'It\'s consistently excellent, dishes are superb and healthily cooked with high quality ingredients.' },
  { id: '3', title: 'Dairy',
    imageL: 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=1110%C3%97350&w=1100&h=350',
    imageS: 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=270%C3%97150&w=270&h=150',
    desc: 'A dairy product is food produced from the milk of mammals, primarily cows, water buffaloes, goats, sheep, yaks.' },
  { id: '4', title: 'Meat',
    imageL: 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=1110%C3%97350&w=1100&h=350',
    imageS: 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=270%C3%97150&w=270&h=150',
    desc: 'Only superior quality beef, lamb, pork.' },
  { id: '5', title: 'Seafood',
    imageL: 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=1110%C3%97350&w=1100&h=350',
    imageS: 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=270%C3%97150&w=270&h=150',
    desc: 'Great place to buy fresh seafood.' },
  { id: '6', title: 'Fruit & Veg',
    imageL: 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=1110%C3%97350&w=1100&h=350',
    imageS: 'https://placeholdit.imgix.net/~text?txtsize=33&bg=373a3c&txtclr=ffffff&txt=270%C3%97150&w=270&h=150',
    desc: 'A variety of fresh fruits and vegetables.' }
];


  getCategories() {
  return this.categories;
}

  getCategory(id : string) {
  for(let i = 0; i < this.categories.length; i++) {
    if(this.categories[i].id === id) {
      return this.categories[i];
    }
  }
  throw new CategoryNotFoundException(`Category ${id} is not found!!!`);
}

}


