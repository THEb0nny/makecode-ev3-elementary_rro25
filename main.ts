// Часть 1 - перевести аккумулятор
function TransferBattery () {
    chassis.rampLinearDistMove(40, 70, 150, 60, 100)
    Claw(false, 50, false)
    pause(100)
    chassis.linearDistMove(60, -60, Braking.Hold)
    pause(100)
    chassis.spinTurn(90, 70)
    pause(50)
    RaiseClawAfterDelayInParallel(3000)
    chassis.rampLinearDistMove(30, 60, 120, 60, 40)
    if (true) {
        pause(50)
        levelings.linePositioning(500, params.linePositioningAllParams(500, 50, 0.6, 0, 0))
    }
    pause(50)
    motions.rampLineFollowToDistance(1670, 150, 0, Braking.NoStop, params.rampLineFollowSixParams(30, 70, 70, 0.6, 0.8))
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
        motions.rampLineFollowToDistance(380, 100, 100, Braking.Hold, params.rampLineFollowThreeParams(30, 50, 30))
    }
    chassis.spinTurn(90, 70)
    levelings.lineAlignment(VerticalLineLocation.Behind, 1000, false, params.lineAlignmentSevenParams(50, 1.1, 1.1, 0, 0))
    chassis.rampLinearDistMove(40, 80, 660, 40, 70)
    Claw(false, 40, false)
    chassis.linearDistMove(300, -60, Braking.Hold)
    pause(100)
    chassis.spinTurn(-90, 70)
    pause(50)
    Claw(true, 60, true)
    chassis.rampLinearDistMove(40, 80, 150, 40, 70)
    Claw(false, 40, false)
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
    pause(50)
    RaiseClawAfterDelayInParallel(2500)
    motions.rampLineFollowToDistance(100, 100, 0, Braking.NoStop, params.rampLineFollowSixParams(30, 70, 70, 0.5, 0.5))
    motions.lineFollowToCrossIntersection(AfterMotion.NoStop, params.lineFollowFourParams(70, 0.5, 0.5))
    chassis.rampLinearDistMove(30, 70, 110, 0, 100)
    pause(100)
    motions.moveToRefZone(0, -50, LineSensorSelection.LeftOrRight, Comparison.LessOrEqual, 40, AfterMotion.BreakStop)
    chassis.linearDistMove(40, 60, Braking.Hold)
    pause(50)
    chassis.spinTurn(180, 60)
}
function GetColor (debug: boolean) {
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
// Поднять манипулятор после задержки в параллельной задаче
function RaiseClawAfterDelayInParallel (delay: number) {
    control.runInParallel(function () {
        pause(delay)
        music.playSoundEffect(sounds.informationUp)
        Claw(true, 50, true)
    })
}
// Часть 3 - перевести первый спутник
function MoveSatellite () {
    motions.rampLineFollowToDistance(100, 60, 40, Braking.Hold, params.rampLineFollowThreeParams(40, 60, 30))
    pause(50)
    chassis.spinTurn(90, 60)
    pause(10)
    levelings.lineAlignment(VerticalLineLocation.Behind, 750, false, params.lineAlignmentSevenParams(50, 1.1, 1.1, 0, 0))
    pause(50)
    chassis.linearDistMove(110, 60, Braking.Hold)
    pause(50)
    chassis.pivotTurn(90, 70, WheelPivot.LeftWheel)
    pause(50)
    chassis.linearDistMove(70, 50, Braking.Hold)
    current_color = -1
    for (let index = 0; index <= 4; index++) {
        setellite_zone = index + 1
        Claw(false, 20, false)
        current_color = CheckSetelliteColor()
        brick.printValue("current_color", current_color, 11)
        if (current_color != 0) {
            VoiceSatelliteColor(current_color)
            break;
        } else {
            music.playSoundEffectUntilDone(sounds.communicationNo)
            Claw(true, 75, true)
            chassis.spinTurn(5, 50)
            pause(50)
            chassis.linearDistMove(150, 50, Braking.Hold)
        }
    }
    pause(50)
    chassis.linearDistMove(20, -60, Braking.Hold)
    pause(50)
    chassis.spinTurn(-90, 80)
    pause(25)
    motions.moveToRefZone(0, 50, LineSensorSelection.LeftAndRight, Comparison.Less, 20, AfterMotion.BreakStop)
    pause(50)
    levelings.lineAlignment(VerticalLineLocation.Behind, 750, false, params.lineAlignmentSevenParams(50, 1.1, 1.1, 0, 0, 0, 0))
    pause(50)
    chassis.linearDistMove(30, 50, Braking.Hold)
    pause(50)
    chassis.spinTurn(90, 60)
    pause(50)
    motions.rampLineFollowToDistance(900 - 150 * (setellite_zone - 1), 150, 0, Braking.NoStop, params.rampLineFollowSixParams(30, 70, 50, 0.45, 0.5))
    motions.lineFollowToSideIntersection(SideIntersection.LeftInside, AfterMotion.DecelRolling, params.lineFollowTwoParams(50, 0.8))
    pause(50)
    chassis.spinTurn(-90, 60)
    pause(50)
    motions.lineFollowToCrossIntersection(AfterMotion.NoStop, params.lineFollowFourParams(70, 0.5, 0.5))
    chassis.rampLinearDistMove(30, 80, 280, 50, 70)
    pause(50)
    chassis.spinTurn(-90, 60)
    pause(50)
    chassis.rampLinearDistMove(40, 80, 310, 50, 100)
    pause(50)
    if (current_color == 6) {
        cross = 0
    } else if (current_color == 3) {
        cross = 1
    } else if (current_color == 2) {
        cross = 2
    } else if (current_color == 4) {
        cross = 3
    } else if (current_color == 5) {
        cross = 4
    }
    if (false) {
        motions.lineFollowToDistance(40, AfterMotion.NoStop, params.lineFollowTwoParams(40, 0.6))
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
brick.buttonLeft.onEvent(ButtonEvent.Pressed, function () {
    sensors.searchRgbMinMax(sensors.color3)
})
// Вспомогательная функция проверки цвета спутника
function CheckSetelliteColor () {
    result_color = -1
    color_samples = [-1]
    color_check_time = 100
    control.timer1.reset()
    control.runInParallel(function () {
        music.playSoundEffect(sounds.informationAnalyze)
        while (control.timer1.millis() < color_check_time) {
            color_samples.push(GetColor(true))
            pause(10)
        }
    })
    pause(10)
    ShakeSatellite()
    pauseUntil(() => control.timer1.millis() >= color_check_time + 10)
    result_color = custom.mostFrequentNumber(color_samples)
    if (result_color == ColorSensorColor.Black) {
        result_color = ColorSensorColor.White
    }
    if (result_color == ColorSensorColor.Brown) {
        result_color = ColorSensorColor.Yellow
    }
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
        music.playSoundEffectUntilDone(sounds.colorsBlue)
    } else if (color == ColorSensorColor.Green) {
        music.playSoundEffectUntilDone(sounds.colorsGreen)
    } else if (color == ColorSensorColor.Yellow) {
        music.playSoundEffectUntilDone(sounds.colorsYellow)
    } else if (color == ColorSensorColor.Red) {
        music.playSoundEffectUntilDone(sounds.colorsRed)
    } else if (color == ColorSensorColor.White) {
        music.playSoundEffectUntilDone(sounds.colorsWhite)
    } else if (color == ColorSensorColor.Black) {
        music.playSoundEffectUntilDone(sounds.colorsBlack)
    }
}
// Часть 4 - отвезти последний красный кубик0
function MoveLastRedSpaceGarbage () {
    chassis.spinTurn(-90, 70)
    pause(25)
    for (let index3 = 0; index3 <= 4 - cross - 1; index3++) {
        if (index3 == 4) {
            motions.lineFollowToSideIntersection(SideIntersection.RightInside, AfterMotion.BreakStop, params.lineFollowFourParams(50, 0.7, 0))
        } else {
            motions.lineFollowToSideIntersection(SideIntersection.RightInside, AfterMotion.RollingNoStop, params.lineFollowFourParams(50, 0.7, 0))
        }
    }
    pause(25)
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
    motions.lineFollowToDistance(200, AfterMotion.NoStop)
    motions.lineFollowToCrossIntersection(AfterMotion.NoStop, params.lineFollowFourParams(70, 0.5, 0.5))
    chassis.rampLinearDistMove(30, 70, 150, 0, 150)
    pause(50)
    chassis.spinTurn(90, 60)
    pause(50)
    chassis.accelStartLinearDistMove(30, 70, 300, 50)
    motions.moveToRefZone(0, 70, LineSensorSelection.LeftOrRight, Comparison.Less, 30, AfterMotion.DecelRolling)
    pause(50)
    chassis.spinTurn(90, 60)
    pause(50)
    RaiseClawAfterDelayInParallel(2500)
    motions.rampLineFollowToDistance(100, 100, 0, Braking.NoStop, params.rampLineFollowSixParams(30, 70, 70, 0.5, 0.5))
    motions.lineFollowToCrossIntersection(AfterMotion.NoStop, params.lineFollowFourParams(70, 0.5, 0.5))
    chassis.rampLinearDistMove(30, 70, 110, 0, 100)
    pause(100)
    motions.moveToRefZone(0, -50, LineSensorSelection.LeftOrRight, Comparison.LessOrEqual, 40, AfterMotion.BreakStop)
    chassis.linearDistMove(40, 60, Braking.Hold)
    pause(50)
    chassis.spinTurn(180, 60)
}
let color_check_time = 0
let color_samples: number[] = []
let result_color = 0
let cross = 0
let setellite_zone = 0
let current_color = 0
let color = 0
let hsvl: number[] = []
let rgb: number[] = []
brick.showImage(images.expressionsMouth1open)
chassis.setChassisMotors(motors.mediumB, motors.mediumC, true, false)
chassis.setSpeedRegulated(false)
chassis.setSyncRegulatorGains(0.02, 0.001, 0.5)
chassis.setWheelDiametr(62.4, MeasurementUnit.Millimeters)
chassis.setBaseLength(170, MeasurementUnit.Millimeters)
sensors.setNxtLightSensorsAsLineSensors(sensors.nxtLight1, sensors.nxtLight4)
sensors.setLineSensorsRawRefValues(2272, 1660, 2504, 1950)
sensors.setColorSensorMinRgbValues(sensors.color3, 3, 3, 3)
sensors.setColorSensorMaxRgbValues(sensors.color3, 98, 87, 95)
//      * Значения перевода HSVL в цветовые коды.
//      * значение границы цветности S, если значение S выше, тогда объект будет считаться цветным иначе чёрно-белым (или что ничего нет), eg: 50
//      * значение границы белого V, если значение V ≥ этому, тогда объект будет считаться белым, eg: 10
//      * значение границы чёрного V, если значение ≥ этому числу, но меньше белого числа, тогда будет считаться чёрным цветом, а всё что ниже этого будет считаться, что цвета нет, eg: 1
//      * значение границы красного H, от 0 до этого значения, eg: 25
//      * значение границы коричневого H, от красного до этого значения, eg: 40
//      * значение границы жёлтого H, от коричневого до этого значения, eg: 100
//      * значение границы зелёного H, от жёлтого до этого значения, eg: 180
//      * значение границы синего H, от зелёного до этого значения, а после до 360 (включительно) снова идёт красный, eg: 260
sensors.setHsvlToColorNumParams(sensors.color3, sensors.hsvlToColorNumParams(
50,
4,
1,
25,
26,
100,
190,
270
))
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
motions.setSteeringAtSearchLineForLineFollowOneSensor(50)
motors.mediumD.setInverted(false)
Claw(true, 50, true)
sensors.color3.pauseUntilColorDetected(ColorSensorColor.None)
brick.printValue("V", brick.batteryInfo(BatteryProperty.Voltage), 1)
// Индикатор начала проги
brick.setStatusLight(StatusLight.GreenPulse)
// Ждать нажатие центральной клавиши
brick.buttonEnter.pauseUntil(ButtonEvent.Bumped)
// Индикатор выключаем
brick.setStatusLight(StatusLight.Off)
if (false) {
    while (true) {
        GetColor(true)
        pause(10)
    }
}
if (true) {
    pause(100)
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
    pause(100)
    MoveSatellite()
}
