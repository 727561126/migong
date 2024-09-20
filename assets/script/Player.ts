import { _decorator, Component, Node } from 'cc';
import { Joystick } from './Joystick';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {

    @property(Joystick) js:Joystick;
    moveSpeed = 10;
    maxX = 640;
    maxY = 360;

    start() {

    }

    update(deltaTime: number) {
        const jsDir = this.js.getMDir();
        this.node.setPosition(this.node.position.x+jsDir.x*this.moveSpeed*deltaTime,this.node.position.y +jsDir.y*this.moveSpeed*deltaTime );
       
        const scalex = this.node.position.x > this.maxX ? this.maxX: this.node.position.x;
        const scaley = this.node.position.y > this.maxY ? this.maxY: this.node.position.y;
        const scalex1 = scalex<-this.maxX? -this.maxX : scalex;
        const scaley1 = scaley<-this.maxY? -this.maxY : scaley;
        this.node.setPosition(scalex1,scaley1);

        console.log(this.node.position);
    }
}


