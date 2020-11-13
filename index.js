// placé volontairement dans global scope afin de ne pas être mis dans garbage collection, pas-sûr que ça fonctionne comme ça mais dans l'idée...
const options = {
    root: document.querySelector('.slideshow-frame'),
    threshold: 1.0,
    rootMargin: '15px'
}

const MathUtils = {
    distance: (x1, x2, y1, y2) => {
        var a = x1 - x2; // soit (slides[center].left + slides[center].width/2) - (slides[center + 1].left + slides[center + 1].width/2)
        var b = y1 - y2; // soit même left * 2 + 2 moitiés d'item soit + 1 item entier
        // console.log('x1: ', x1, 'x2: ', x2, 'x1 - x2: ', a);
        // console.log('y1: ', y1, 'y2: ', y2, 'y1 - y2: ', b);
        // console.log('Math.hypot(a,b): ', Math.hypot(a,b))
        return Math.abs(x1 - x2);
        return Math.hypot(a,b);
    },
}

class Slideshow {
    constructor(el){
        this.DOM = {el};
        this.DOM.cards = [];
        [...this.DOM.el.querySelectorAll('.slideshow__card')].forEach(card => this.DOM.cards.push(card));

        this.DOM.interactions = {
            left: document.querySelector('.slideshow-frame__button--prev'),
            right: document.querySelector('.slideshow-frame__button--next')
        }

        this.intersectingCards = [];

        this.observeCards(this.DOM.cards);
        this.calculateGap();
        this.initEvents();

        console.log('this.DOM.cards: ', this.DOM.cards);
        console.log('this: ', this);
    }

    observeCards(items){ 
        const observer = new IntersectionObserver(entries => {
            console.log('Observed: ', entries)
            new Promise((resolve, reject) => {
                this.intersectingCards.splice();
                const temp = entries.filter(entry => entry.isIntersecting);
                temp.filter((intersecting, i, array) => intersecting === array[0] ||intersecting === array[array.length-1]).forEach(_ => this.intersectingCards.push(_));    
                resolve()
            }).then(_ => observer.disconnect())
        }, options);
        
        items.forEach(item => observer.observe(item));
    }

    calculateGap() {
        const s1 = this.DOM.cards[0].getBoundingClientRect();
        const s2 = this.DOM.cards[1].getBoundingClientRect();
        this.gap = MathUtils.distance(s1.left, s2.left, s1.top, s2.top);
        // this.DOM.el.style.transform = `translateX(-${this.gap}px)`;

    }

    // navigate(direction){
    //     if (this.isAnimating) {
    //         return false;
    //     }
    //     this.isAnimating = true;
    //     const upcomingPos = direction === 'right' ?
    //     this.
    // }

    initEvents(){
        this.clickLeftFn = () => this.navigate('left');
        this.DOM.interactions.left.addEventListener('click', this.clickLeftFn);

        this.clickRightFn = () => this.navigate('right');
        this.DOM.interactions.right.addEventListener('click', this.clickRightFn);
    }


    // move(direction, val){
    //     return new Promise((resolve, reject) => {

            
    //     })
    // }
}

new Slideshow(document.querySelector('.slideshow'));

