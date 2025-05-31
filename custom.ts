const enum ClawState2 {
    //% block="up"
    //% block.loc.ru="поднять"
    Up,
    //% block="down"
    //% block.loc.ru="опустить"
    Down
}

const enum LinearMotorPos {
    //% block="left"
    //% block.loc.ru="влево"
    Left,
    //% block="right"
    //% block.loc.ru="вправо"
    Right
}

const enum MotorBreak {
    //% block="hold"
    //% block.loc.ru="удерживать"
    Hold,
    //% block="no hold"
    //% block.loc.ru="не удерживать"
    NoHold
}

const enum VoiceActing {
    //% block="expect end"
    //% block.loc.ru="ожидать конца"
    ExpectEnd,
    //% block="in parallel task"
    //% block.loc.ru="в параллельной задаче"
    InParallel
}

namespace custom {

    /**
     * Функция/блок захвата.
     * @param state позиция, eg: ClawState2.Up
     * @param speed скорость, eg: 50
     * @param breakState стостояние удержание после завершения, eg: MotorBreak.NoHold
     * @param timeToLaunch время, которое даётся для запуска мотора в мсек, eg: 100
     */
    //% blockId="ClawMotor"
    //% block="claw $state at $speed\\%|$breakState||time to launch $timeToLaunch"
    //% block.loc.ru="захват $state на $speed\\%|$breakState||время для запуска $timeToLaunch"
    //% inlineInputMode="inline"
    //% expandableArgumentMode="enabled"
    //% weight="89"
    //% group="Захват"
    export function Claw(state: ClawState2, speed: number, breakState: MotorBreak, timeToLaunch: number = 100) {
        motors.mediumD.setBrake(breakState == MotorBreak.Hold ? true : false);
        if (state == ClawState2.Up) motors.mediumD.run(speed);
        else if (state == ClawState2.Down) motors.mediumD.run(-speed);
        else return;
        pause(timeToLaunch);
        motors.mediumD.pauseUntilStalled();
        motors.mediumD.stop();
    }

    /**
     * Функция/блок мотора линейного перемещения.
     * @param pos позиция, eg: LinearMotorPos.Left
     * @param speed скорость, eg: 50
     * @param breakState стостояние удержание после завершения, eg: MotorBreak.NoHold
     * @param timeToLaunch время, которое даётся для запуска мотора в мсек, eg: 100
     */
    //% blockId="LinearMotor"
    //% block="linear motion motor $pos at $speed\\%|$breakState||time to launch $timeToLaunch"
    //% block.loc.ru="мотор линейного перемещения $pos на $speed\\%|$breakState||время для запуска $timeToLaunch"
    //% inlineInputMode="inline"
    //% expandableArgumentMode="enabled"
    //% weight="88"
    //% group="Мотор линейного перемещения"
    export function LinearMotor(pos: LinearMotorPos, speed: number, breakState: MotorBreak, timeToLaunch: number = 100) {
        motors.mediumA.setBrake(breakState == MotorBreak.Hold ? true : false);
        if (pos == LinearMotorPos.Left) motors.mediumA.run(speed);
        else if (pos == LinearMotorPos.Right) motors.mediumA.run(-speed);
        else return;
        pause(timeToLaunch);
        motors.mediumA.pauseUntilStalled();
        motors.mediumA.stop();
    }

    /**
     * Функция озвучивания цвета спутника.
     * @param color код цвета, eg: 6
     * @param voiceActing вариант озвучивания, eg: VoiceActing.ExpectEnd
     */
    //% blockId="VoiceSatelliteColor"
    //% block="voice color $color satellite $voiceActing"
    //% block.loc.ru="озвучить цвет $color спутника $voiceActing"
    //% inlineInputMode="inline"
    //% weight="79"
    //% group="Озвучивание"
    export function VoiceSatelliteColor(color: number, voiceActing: VoiceActing) {
        if (voiceActing == VoiceActing.ExpectEnd) {
            if (color == ColorSensorColor.Blue) music.playSoundEffectUntilDone(sounds.colorsBlue);
            else if (color == ColorSensorColor.Green) music.playSoundEffectUntilDone(sounds.colorsGreen);
            else if (color == ColorSensorColor.Yellow) music.playSoundEffectUntilDone(sounds.colorsYellow);
            else if (color == ColorSensorColor.Red) music.playSoundEffectUntilDone(sounds.colorsRed);
            else if (color == ColorSensorColor.White) music.playSoundEffectUntilDone(sounds.colorsWhite);
            else if (color == ColorSensorColor.Black) music.playSoundEffectUntilDone(sounds.colorsBlack);
            else music.playSoundEffectUntilDone(sounds.communicationNo);
        } else if (voiceActing == VoiceActing.InParallel) {
            if (color == ColorSensorColor.Blue) music.playSoundEffect(sounds.colorsBlue);
            else if (color == ColorSensorColor.Green) music.playSoundEffect(sounds.colorsGreen);
            else if (color == ColorSensorColor.Yellow) music.playSoundEffect(sounds.colorsYellow);
            else if (color == ColorSensorColor.Red) music.playSoundEffect(sounds.colorsRed);
            else if (color == ColorSensorColor.White) music.playSoundEffect(sounds.colorsWhite);
            else if (color == ColorSensorColor.Black) music.playSoundEffect(sounds.colorsBlack);
            else music.playSoundEffect(sounds.communicationNo);
        }
    }

}