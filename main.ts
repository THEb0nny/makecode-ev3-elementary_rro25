// Часть 1 - перевести аккумулятор
function TransferBattery () {
    chassis.rampLinearDistMove(40, 70, 150, 60, 100)
    Claw(false, 50, false)
    pause(50)
    chassis.linearDistMove(70, -60, Braking.Hold)
    chassis.spinTurn(90, 70)
    control.runInParallel(function () {
        pause(3000)
        music.playSoundEffect(sounds.informationUp)
        Claw(true, 50, true)
    })
    chassis.rampLinearDistMove(30, 60, 120, 60, 40)
    motions.rampLineFollowToDistance(1670, 100, 0, Braking.NoStop, params.rampLineFollowSixParams(30, 70, 70, 0.6, 0.8))
    chassis.rampLinearDistMove(30, 70, 100, 0, 70)
    chassis.linearDistMove(80, -60, Braking.Hold)
    pause(50)
    chassis.spinTurn(180, 70)
}
// Часть 2 - перевести два первых красных блока космического мусора
function MoveTwoRedSpaceGarbage () {
    if (false) {
        motions.rampLineFollowToDistance(100, 50, 0, Braking.NoStop, params.rampLineFollowSixParams(30, 40, 40, 0.8, 0))
        motions.lineFollowToSideIntersection(SideIntersection.RightInside, AfterMotion.BreakStop, params.lineFollowTwoParams(40, 0.9))
        motions.rampLineFollowToDistance(240, 0, 100, Braking.Hold, params.rampLineFollowThreeParams(40, 50, 30))
    } else {
        motions.rampLineFollowToDistance(390, 100, 100, Braking.Hold, params.rampLineFollowThreeParams(30, 50, 30))
    }
    chassis.spinTurn(90, 70)
    levelings.lineAlignment(VerticalLineLocation.Behind, 1000, false, params.lineAlignmentSevenParams(50, 1.1, 1.1, 0, 0))
    chassis.rampLinearDistMove(40, 80, 660, 40, 70)
    Claw(false, 50, false)
    chassis.linearDistMove(300, -60, Braking.Hold)
    pause(100)
    chassis.spinTurn(-90, 70)
    pause(50)
    Claw(true, 60, true)
    chassis.rampLinearDistMove(40, 80, 150, 40, 70)
    Claw(false, 50, false)
    pause(50)
    chassis.linearDistMove(150, -60, Braking.Hold)
    pause(100)
    chassis.spinTurn(-90, 70)
    motions.moveToRefZone(0, 70, LineSensorSelection.LeftOrRight, Comparison.Greater, 80, AfterMotion.NoStop)
    motions.moveToRefZone(0, 70, LineSensorSelection.LeftOrRight, Comparison.Less, 30, AfterMotion.BreakStop)
    pause(50)
    levelings.lineAlignment(VerticalLineLocation.Behind, 750, false, params.lineAlignmentSevenParams(50, 1.1, 1.1, 0, 0))
    pause(50)
    chassis.linearDistMove(30, 60, Braking.Hold)
    pause(50)
    chassis.spinTurn(90, 60)
    control.runInParallel(function () {
        pause(2500)
        music.playSoundEffect(sounds.informationUp)
        Claw(true, 50, true)
    })
    if (false) {
        motions.rampLineFollowToDistance(1240, 100, 0, Braking.NoStop, params.rampLineFollowSixParams(30, 70, 30, 0.5, 0.5))
        chassis.rampLinearDistMove(30, 70, 120, 0, 100)
    } else {
        motions.rampLineFollowToDistance(100, 100, 0, Braking.NoStop, params.rampLineFollowSixParams(30, 70, 70, 0.5, 0.5))
        motions.lineFollowToCrossIntersection(AfterMotion.NoStop, params.lineFollowFourParams(70, 0.5, 0.5))
        chassis.rampLinearDistMove(30, 70, 110, 0, 100)
    }
    pause(100)
    motions.moveToRefZone(0, -50, LineSensorSelection.LeftOrRight, Comparison.LessOrEqual, 40, AfterMotion.BreakStop)
    chassis.linearDistMove(40, 60, Braking.Hold)
    pause(50)
    chassis.spinTurn(180, 60)
    pause(50)
}
function CheckColor (debug: boolean) {
    rgb = sensors.getNormalizeRgb(sensors.color3)
    hsvl = sensors.convertRgbToHsvl(rgb)
    color = sensors.convertHsvlToColorNum(hsvl, sensors.getHsvlToColorNumParams(sensors.color3))
    if (debug) {
        brick.clearScreen()
        brick.printValue("r", rgb[0], 1)
        brick.printValue("g", rgb[1], 2)
        brick.printValue("b", rgb[2], 3)
        brick.printValue("h", hsvl[0], 5)
        brick.printValue("s", hsvl[1], 6)
        brick.printValue("v", hsvl[2], 7)
        brick.printValue("l", hsvl[3], 8)
        brick.printValue("color", color, 10)
    }
    return color
}
// Часть 3 - перевести первый спутник
function MoveSatellite () {
    motions.rampLineFollowToDistance(100, 60, 40, Braking.Hold, params.rampLineFollowThreeParams(30, 60, 30))
    pause(50)
    chassis.spinTurn(90, 60)
    levelings.lineAlignment(VerticalLineLocation.Behind, 750, false, params.lineAlignmentSevenParams(50, 1.1, 1.1, 0, 0))
    chassis.linearDistMove(110, 60, Braking.Hold)
    pause(50)
    chassis.pivotTurn(90, 70, WheelPivot.LeftWheel)
    chassis.linearDistMove(70, 50, Braking.Hold)
    for (let index = 0; index <= 4; index++) {
        setellite_zone = index + 1
        Claw(false, 60, false)
        current_color = CheckSetelliteColor()
        if (current_color != ColorSensorColor.None) {
            sattelites[setellite_zone] = current_color
            VoiceSatelliteColor(current_color)
            break;
        } else {
            music.playSoundEffect(sounds.communicationNo)
            Claw(true, 75, true)
            pause(100)
            chassis.spinTurn(5, 50)
            chassis.linearDistMove(150, 50, Braking.Hold)
        }
    }
    pause(50)
    chassis.linearDistMove(20, -60, Braking.Hold)
    chassis.spinTurn(-90, 80)
    motions.moveToRefZone(0, 50, LineSensorSelection.LeftAndRight, Comparison.Less, 20, AfterMotion.BreakStop)
    levelings.lineAlignment(VerticalLineLocation.Behind, 750, false, params.lineAlignmentSevenParams(50, 1.1, 1.1, 0, 0, 0, 0))
    chassis.linearDistMove(30, 50, Braking.Hold)
    pause(50)
    chassis.spinTurn(90, 60)
    motions.rampLineFollowToDistance(900 - 150 * (setellite_zone - 1), 150, 0, Braking.NoStop, params.rampLineFollowSixParams(30, 70, 50, 0.45, 0.5))
    motions.lineFollowToSideIntersection(SideIntersection.LeftInside, AfterMotion.DecelRolling, params.lineFollowTwoParams(50, 0.8))
    chassis.spinTurn(-90, 50)
    pause(50)
    motions.lineFollowToCrossIntersection(AfterMotion.NoStop, params.lineFollowFourParams(80, 0.5, 0.5))
    chassis.rampLinearDistMove(30, 80, 280, 50, 70)
    pause(50)
    chassis.spinTurn(-90, 60)
    pause(50)
    chassis.rampLinearDistMove(30, 80, 320, 50, 100)
    pause(50)
    if (current_color == ColorSensorColor.White) {
        cross = 0
    } else if (current_color == ColorSensorColor.Green) {
        cross = 1
    } else if (current_color == ColorSensorColor.Blue) {
        cross = 2
    } else if (current_color == ColorSensorColor.Yellow) {
        cross = 3
    } else if (current_color == ColorSensorColor.Red) {
        cross = 4
    }
    if (false) {
        motions.lineFollowToDistance(40, AfterMotion.NoStop, params.lineFollowTwoParams(30, 0.6))
    }
    for (let index2 = 0; index2 <= cross; index2++) {
        if (index2 != cross) {
            motions.lineFollowToSideIntersection(SideIntersection.RightInside, AfterMotion.RollingNoStop, params.lineFollowTwoParams(45, 0.7))
        } else {
            motions.lineFollowToSideIntersection(SideIntersection.RightInside, AfterMotion.DecelRolling, params.lineFollowTwoParams(45, 0.7))
        }
    }
    pause(50)
    chassis.spinTurn(90, 60)
    pause(50)
    motions.lineFollowToDistance(90, AfterMotion.BreakStop, params.lineFollowFourParams(50, 0.5, 0))
    Claw(true, 75, true)
    chassis.linearDistMove(80, -50, Braking.Hold)
}
// Вспомогательная функция проверки цвета спутника
function CheckSetelliteColor () {
    control.runInParallel(function () {
        music.playSoundEffect(sounds.informationAnalyze)
        color_samples = [-1]
        control.timer1.reset()
        while (control.timer1.millis() < 1000) {
            color_samples.push(CheckColor(true))
            pause(10)
        }
        result_color = custom.mostFrequentNumber(color_samples)
        if (result_color == ColorSensorColor.Brown) {
            result_color = ColorSensorColor.Yellow
        }
        brick.printValue("current_color", current_color, 12)
    })
    ShakeSatellite()
    pause(500)
    return result_color
}
// Вспомогательная функция, с помощью которой робот трясёт спутник, чтобы правильно прочитать значение цвета
function ShakeSatellite () {
    chassis.spinTurn(5, 50, 1000)
    pause(100)
    chassis.spinTurn(-10, 50, 1000)
    pause(100)
    chassis.spinTurn(5, 50, 1000)
}
function Claw (isOpen: boolean, speed: number, hold: boolean) {
    motors.mediumD.setBrake(hold)
    if (isOpen) {
        motors.mediumD.run(speed)
    } else {
        motors.mediumD.run(speed * -1)
    }
    pause(100)
    motors.mediumD.pauseUntilStalled()
    motors.mediumD.stop()
}
function VoiceSatelliteColor (color: number) {
    if (color == ColorSensorColor.Blue) {
        music.playSoundEffect(sounds.colorsBlue)
    } else if (color == ColorSensorColor.Green) {
        music.playSoundEffect(sounds.colorsGreen)
    } else if (color == ColorSensorColor.Yellow) {
        music.playSoundEffect(sounds.colorsYellow)
    } else if (color == ColorSensorColor.Red) {
        music.playSoundEffect(sounds.colorsRed)
    } else if (color == ColorSensorColor.White) {
        music.playSoundEffect(sounds.colorsWhite)
    }
}
// Часть 4 - отвезти последний красный кубик0
function MoveLastRedSpaceGarbage () {
    chassis.spinTurn(-90, 70)
    for (let index3 = 0; index3 <= 4 - cross - 1; index3++) {
        if (index3 == 4) {
            motions.lineFollowToSideIntersection(SideIntersection.RightInside, AfterMotion.BreakStop, params.lineFollowFourParams(50, 0.7, 0))
        } else {
            motions.lineFollowToSideIntersection(SideIntersection.RightInside, AfterMotion.RollingNoStop, params.lineFollowFourParams(50, 0.7, 0))
        }
    }
    chassis.linearDistMove(80, 60, Braking.Hold)
    pause(50)
    chassis.spinTurn(-90, 50)
    pause(50)
    chassis.linearDistMove(50, 60, Braking.Hold)
    Claw(false, 50, false)
    pause(50)
    chassis.linearDistMove(40, -60, Braking.Hold)
    pause(50)
    chassis.spinTurn(-90, 60)
    pause(50)
    motions.lineFollowToCrossIntersection(AfterMotion.NoStop, params.lineFollowFourParams(80, 0.5, 0.5))
    chassis.rampLinearDistMove(30, 70, 150, 0, 150)
    pause(50)
    chassis.spinTurn(90, 60)
    pause(50)
    chassis.accelStartLinearDistMove(30, 70, 300, 50)
    motions.moveToRefZone(0, 70, LineSensorSelection.LeftOrRight, Comparison.Less, 30, AfterMotion.DecelRolling)
    pause(50)
    chassis.spinTurn(90, 60)
    pause(50)
    control.runInParallel(function () {
        pause(2500)
        music.playSoundEffect(sounds.informationUp)
        Claw(true, 60, true)
    })
    motions.rampLineFollowToDistance(1240, 150, 100, Braking.NoStop, params.rampLineFollowSixParams(30, 80, 30, 0.6, 0.5))
    chassis.rampLinearDistMove(30, 70, 110, 0, 100)
}
let result_color = 0
let color_samples: number[] = []
let cross = 0
let current_color = 0
let setellite_zone = 0
let color = 0
let hsvl: number[] = []
let rgb: number[] = []
let sattelites: number[] = []
brick.showImage(images.eyesCrazy2)
chassis.setChassisMotors(motors.mediumB, motors.mediumC, true, false)
chassis.setSpeedRegulated(false)
chassis.setSyncRegulatorGains(0.01, 0.001, 0.5)
chassis.setWheelDiametr(62.4, MeasurementUnit.Millimeters)
chassis.setBaseLength(170, MeasurementUnit.Millimeters)
sensors.setNxtLightSensorsAsLineSensors(sensors.nxtLight1, sensors.nxtLight4)
sensors.setLineSensorsRawRefValues(2312, 1632, 2448, 1916)
sensors.setColorSensorMinRgbValues(sensors.color3, 5, 5, 6)
sensors.setColorSensorMaxRgbValues(sensors.color3, 206, 227, 224)
sensors.setHsvlToColorNumParams(sensors.color3, sensors.hsvlToColorNumParams(40, 10, 1, 25, 26, 100, 180, 260))
// Расстояние для прокатки после определения перекрёстка
motions.setDistRollingAfterIntersection(40)
// Расстояние для съезда с линии после определения перекрёстка
motions.setDistRollingFromLineAfterIntersection(20)
// Значение отражения для определения линии
motions.setLineRefTreshold(40)
// Максимальная ошибка при движении по линии одним датчиком для определния перекрёстка
motions.setLineFollowConditionMaxErr(50)
motions.setLineFollowLoopDt(1)
levelings.setLineAlignmentOrPositioningLoopDt(1)
motions.setLineFollowConditionMaxErr(50)
motions.setSteeringAtSearchLineForLineFollowOneSensor(40)
motors.mediumD.setInverted(false)
Claw(true, 50, true)
sensors.color3.pauseUntilColorDetected(ColorSensorColor.None)
sattelites = [
-1,
-1,
-1,
-1,
-1
]
brick.printValue("V", brick.batteryInfo(BatteryProperty.Voltage), 1)
// Индикатор начала проги
brick.setStatusLight(StatusLight.GreenPulse)
// Ждать нажатие центральной клавиши
brick.buttonEnter.pauseUntil(ButtonEvent.Bumped)
// Индикатор выключаем
brick.setStatusLight(StatusLight.Off)
pause(10)
if (true) {
    TransferBattery()
}
if (true) {
    pause(100)
    MoveTwoRedSpaceGarbage()
}
if (true) {
    pause(100)
    MoveSatellite()
}
if (true) {
    pause(100)
    MoveLastRedSpaceGarbage()
}
if (true) {
    chassis.linearDistMove(50, -60, Braking.Hold)
    chassis.spinTurn(180, 60)
    MoveSatellite()
}
