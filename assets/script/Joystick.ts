import {_decorator, Component, EventTouch, Node, UITransform, v3, Vec2 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Joystick')
export class Joystick extends Component {
    @property(Node) center:Node;

    uiTran: UITransform;
  
    maxR = 90;
    mDir = new Vec2(0,0);
  
    getMDir(){
        return this.mDir;
    }
  
    start() {
        this.uiTran=this.node.getComponent(UITransform);
        this.openTouchEvent();
    }
  
    openTouchEvent(){
        this.node.on(Node.EventType.TOUCH_START,this.onTouchMove,this);
        this.node.on(Node.EventType.TOUCH_MOVE,this.onTouchMove,this);
        this.node.on(Node.EventType.TOUCH_END,this.onTouchEnd,this);
        this.node.on(Node.EventType.TOUCH_CANCEL,this.onTouchEnd,this);
    }
  
    onTouchMove(event: EventTouch){
        const uiPos = event.getUILocation();
        const cPos = this.uiTran.convertToNodeSpaceAR(v3(uiPos.x,uiPos.y,0));
        const len = cPos.length();
        const scale = len > this.maxR ? this.maxR: len;
        const out = cPos.normalize().multiplyScalar(scale);
        this.center.setPosition(out);
        this.mDir.set(out.x,out.y);
    }
  
    onTouchEnd(event: EventTouch){
        this.center.setPosition(0,0);
        this.mDir.set(0,0);
    }
  
    update(deltaTime: number) {
        
    }
}


