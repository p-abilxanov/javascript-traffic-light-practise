const COLOR = ['red', 'yellow', 'green'];

class LightColor {
    constructor(info) {
        this.color = info.color;
        this.time = info.time;
    }
}

class Light {
    constructor() {
        this.lightColor;
    }
    async render(timeRed, timeYellow, timeGreen) {
        this.lightTime(COLOR[0]);

        await setTimeout(() => {
            this.hideNumber(0);
            this.lightTime(COLOR[1]);
        }, timeRed * 1000);

        await setTimeout(() => {
            this.hideNumber(1);
            this.lightTime(COLOR[2]);
        }, (timeRed + timeYellow) * 1000);

        await setTimeout(() => {
            this.hideNumber(2)
        }, (timeRed + timeYellow + timeGreen) * 1000);
    }

    // Har bir sandi arasin 1 sekund qilip SHOWNUMBER funkciyasina jiberip atirmiz
    timeIterator(i) {
        setTimeout(() => {
            this.showNumber(i);
        }, (this.lightColor.time - i) * 1000);
    }

    lightTime(color) {
        // Qaysi color tan'lag'an bolsa sol colordin objectin jaratip atirmiz
        switch (color) {
            case COLOR[0]:
                this.lightColor = new LightColor({
                    color: COLOR[0],
                    time: document.querySelector('#number-red').value
                });
                break;
            case COLOR[1]:
                this.lightColor = new LightColor({
                    color: COLOR[1],
                    time: document.querySelector('#number-yellow').value
                });
                break;
            case COLOR[2]:
                this.lightColor = new LightColor({
                    color: COLOR[2],
                    time: document.querySelector('#number-green').value
                });
                break;
        }
        // Colordin' indexi
        this.indexColor = COLOR.indexOf(this.lightColor.color);

        // Background in o'zgertip atirmiz
        document.querySelectorAll('.light__color')[this.indexColor].style.background = `radial-gradient(circle, ${this.lightColor.color} 60%, rgba(255, 255, 255, .1) 70%)`;

        // kiritilgen sandi iteraciyalap TIMEITERATOR funkciyasina jiberip atirmiz 
        for (let i = this.lightColor.time; i >= 0; i--) {
            this.timeIterator(i);
        }
    }

    // sandi ekrang'a shigariwshi function
    showNumber(number) {
        document.querySelectorAll('.light__color')[this.indexColor].setAttribute('data-number', number);
    }

    hideNumber(i) {
        document.querySelectorAll('.light__color')[i].setAttribute('data-number', "");
        document.querySelectorAll('.light__color')[i].removeAttribute('style');
    }
};

var clicked = true;

document.querySelector('.light-stop').addEventListener('click', function () {
    clicked = false;
});

var light = new Light();

document.querySelector('.light-start').addEventListener('click', function () {
    let timeRed = +document.querySelector('#number-red').value + 1;
    let timeYellow = +document.querySelector('#number-yellow').value + 1;
    let timeGreen = +document.querySelector('#number-green').value + 1;

    function lightStart() {
        if (clicked == true) {

            light.render(timeRed, timeYellow, timeGreen);

            setTimeout(() => {
                lightStart();
            }, (timeRed + timeYellow + timeGreen) * 1000);
        }
    }
    lightStart();
});