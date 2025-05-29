document.addEventListener('DOMContentLoaded', function() {
    class Carousel {
        constructor(element) {
            this.element = element;
            this.items = element.querySelectorAll('.carousel-item');
            this.controls = {
                prev: element.querySelector('.carousel-control.prev'),
                next: element.querySelector('.carousel-control.next')
            };
            this.indicators = element.querySelectorAll('.indicator');
            this.currentIndex = 0;
            this.interval = null;
            this.autoPlayDelay = 5000; // 5 segundos

            this.init();
        }

        init() {
            // Mostrar el primer elemento
            this.showItem(this.currentIndex);

            // Agregar event listeners
            if (this.controls.prev) {
                this.controls.prev.addEventListener('click', () => this.prev());
            }
            if (this.controls.next) {
                this.controls.next.addEventListener('click', () => this.next());
            }

            // Agregar event listeners a los indicadores
            this.indicators.forEach((indicator, index) => {
                indicator.addEventListener('click', () => this.showItem(index));
            });

            // Iniciar autoplay
            this.startAutoPlay();
        }

        showItem(index) {
            // Ocultar todos los elementos
            this.items.forEach(item => {
                item.classList.remove('active');
            });

            // Actualizar indicadores
            this.indicators.forEach(indicator => {
                indicator.classList.remove('active');
            });

            // Mostrar el elemento actual
            this.items[index].classList.add('active');
            this.indicators[index].classList.add('active');
            this.currentIndex = index;
        }

        next() {
            let nextIndex = this.currentIndex + 1;
            if (nextIndex >= this.items.length) {
                nextIndex = 0;
            }
            this.showItem(nextIndex);
        }

        prev() {
            let prevIndex = this.currentIndex - 1;
            if (prevIndex < 0) {
                prevIndex = this.items.length - 1;
            }
            this.showItem(prevIndex);
        }

        startAutoPlay() {
            this.interval = setInterval(() => {
                this.next();
            }, this.autoPlayDelay);
        }

        stopAutoPlay() {
            if (this.interval) {
                clearInterval(this.interval);
            }
        }
    }

    // Inicializar todos los carruseles en la página
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        new Carousel(carousel);
    });
});