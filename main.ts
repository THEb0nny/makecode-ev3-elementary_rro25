brick.buttonLeft.onEvent(ButtonEvent.Bumped, function () {
    custom.LinearMotor(LinearMotorPos.Left, 50, MotorBreak.NoHold)
})
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
brick.buttonRight.onEvent(ButtonEvent.Bumped, function () {
    custom.LinearMotor(LinearMotorPos.Right, 50, MotorBreak.NoHold)
})
function hgfjfmjbdnj () {
    chassis.spinTurn(90, 55)
    control.runInParallel(function () {
        custom.LinearMotor(LinearMotorPos.Right, 60, MotorBreak.NoHold)
    })
    if (need_cross == 0) {
        motions.rampLineFollowToDistance(90, 70, 20, Braking.NoStop, params.rampLineFollowThreeParams(30, 70, 10))
    } else {
        motions.rampLineFollowToDistance(190, 140, 40, Braking.NoStop, params.rampLineFollowThreeParams(30, 70, 10))
    }
    motions.lineFollowToCrossIntersection(AfterMotion.NoStop, params.lineFollowFourParams(70, 0.6, 0.5))
    chassis.linearDistMove(160, 70, Braking.Hold)
    chassis.spinTurn(90, 60)
    chassis.linearDistMove(200, 70, Braking.NoStop)
    motions.moveToRefZone(0, 70, LineSensorSelection.LeftOrRight, Comparison.LessOrEqual, 20, AfterMotion.BreakStop)
    motions.moveToRefZone(0, 70, LineSensorSelection.LeftOrRight, Comparison.GreaterOrEqual, 70, AfterMotion.BreakStop)
    levelings.lineAlignment(VerticalLineLocation.Behind, 600, params.lineAlignmentSevenParams(50, 1.1, 1.1, 0, 0))
    chassis.linearDistMove(30, 50, Braking.Hold)
    chassis.spinTurn(90, 70)
}
// Часть 3 - перевести первый спутник
function MoveSatellite () {
    chassis.setBrakeSettleTime(100)
    motions.rampLineFollowToDistance(100, 60, 40, Braking.Hold, params.rampLineFollowThreeParams(30, 60, 10))
    chassis.spinTurn(90, 70)
    chassis.linearDistMove(20, -40, Braking.NoStop)
    levelings.lineAlignment(VerticalLineLocation.Behind, 750, params.lineAlignmentSevenParams(60, 1.1, 1.1, 0, 0))
    chassis.rampLinearDistMove(30, 60, 10, 107, 30, 50)
    chassis.pivotTurn(90, 90, WheelPivot.LeftWheel)
    chassis.rampLinearDistMove(30, 60, 10, 45, 20, 20)
    current_color = -1
    for (let index = 0; index <= 4; index++) {
        setellite_zone = index
        custom.Claw(ClawState2.Down, 60, MotorBreak.NoHold)
        chassis.linearDistMove(30, -50, Braking.Hold)
        chassis.linearDistMove(30, 50, Braking.Hold)
        music.playSoundEffect(sounds.informationAnalyze)
        pause(50)
        current_color = CheckSetelliteColor()
        brick.printValue("current_color", current_color, 11)
        custom.VoiceSatelliteColor(current_color, VoiceActing.ExpectEnd)
        if (current_color != 0) {
            break;
        } else {
            custom.Claw(ClawState2.Up, 60, MotorBreak.Hold)
            chassis.spinTurn(4, 50, 500)
            chassis.linearDistMove(158, 50, Braking.Hold)
        }
    }
    chassis.linearDistMove(20, 60, Braking.Hold)
    chassis.pivotTurn(90, 70, WheelPivot.LeftWheel)
    motions.lineFollowToCrossIntersection(AfterMotion.DecelRolling, params.lineFollowFourParams(40, 0.6, 0))
    chassis.spinTurn(90, 70)
    pause(50)
    motions.setSteeringAtSearchLineForLineFollowOneSensor(15)
    motions.rampLineFollowToDistance(900 - 150 * setellite_zone, 150, 50, Braking.NoStop, params.rampLineFollowThreeParams(30, 60, 50))
    motions.lineFollowToSideIntersection(SideIntersection.LeftInside, AfterMotion.DecelRolling, params.lineFollowFourParams(50, 0.6, 0))
    chassis.spinTurn(-90, 70)
    motions.lineFollowToCrossIntersection(AfterMotion.NoStop, params.lineFollowFourParams(80, 0.5, 0.5))
    chassis.decelFinishLinearDistMove(80, 10, 75, 275)
    pause(50)
    chassis.spinTurn(-90, 70)
    chassis.rampLinearDistMove(30, 90, 10, 310, 75, 50)
    control.runInParallel(function () {
        custom.LinearMotor(LinearMotorPos.Left, 60, MotorBreak.NoHold, 100)
    })
    if (current_color == ColorSensorColor.White) {
        need_cross = 0
    } else if (current_color == ColorSensorColor.Green) {
        need_cross = 1
    } else if (current_color == ColorSensorColor.Blue) {
        need_cross = 2
    } else if (current_color == ColorSensorColor.Yellow) {
        need_cross = 3
    } else if (current_color == ColorSensorColor.Red) {
        need_cross = 4
    } else {
        music.playSoundEffectUntilDone(sounds.systemGeneralAlert)
        brick.exitProgram()
    }
    if (false) {
        motions.lineFollowToDistance(40, AfterMotion.NoStop, params.lineFollowTwoParams(40, 0.6))
    }
    motions.setSteeringAtSearchLineForLineFollowOneSensor(30)
    for (let index = 0; index <= need_cross; index++) {
        if (index != need_cross) {
            motions.lineFollowToSideIntersection(SideIntersection.RightInside, AfterMotion.RollingNoStop, params.lineFollowFourParams(50, 0.7, 0.5))
        } else {
            motions.lineFollowToSideIntersection(SideIntersection.RightInside, AfterMotion.DecelRolling, params.lineFollowFourParams(50, 0.7, 0.5))
        }
    }
    control.runInParallel(function () {
        custom.Claw(ClawState2.Up, 65, MotorBreak.NoHold)
    })
    chassis.spinTurn(90, 70)
    control.runInParallel(function () {
        motors.mediumA.run(70, -220, MoveUnit.Degrees)
    })
    motions.lineFollowToDistance(90, AfterMotion.BreakStop, params.lineFollowFourParams(45, 0.5, 0.5))
    chassis.spinTurn(12, 50)
    chassis.spinTurn(-10, 50)
    chassis.linearDistMove(85, -45, Braking.Hold)
}
// Перемещение двух первых красных космических мусоров
function MoveTwoRedGarbageCubes () {
    chassis.setBrakeSettleTime(75)
    chassis.rampLinearDistMove(30, 60, 10, 55, 20, 20)
    chassis.pivotTurn(80, 70, WheelPivot.LeftWheel)
    DownClawAfterDelayInParallel(1000, 35)
    chassis.rampLinearDistMove(30, 90, 10, 425, 75, 50)
    pause(50)
    chassis.spinTurn(-90, 80)
    chassis.steeringCommand(0, -100)
    pause(500)
    chassis.stop()
    UpClawAfterDelayInParallel(200, 50)
    DownClawAfterDelayInParallel(1000, 35)
    pause(50)
    chassis.rampLinearDistMove(30, 90, 10, 420, 75, 50)
    chassis.pivotTurn(90, 85, WheelPivot.LeftWheel)
    pause(50)
    chassis.rampLinearDistMove(30, 80, 10, 100, 70, 30)
    chassis.pivotTurn(90, 80, WheelPivot.RightWheel)
    control.runInParallel(function () {
        pause(800)
        custom.LinearMotor(LinearMotorPos.Right, 50, MotorBreak.NoHold, 100)
    })
    chassis.accelStartLinearDistMove(30, 70, 50)
    motions.moveToRefZone(0, 70, LineSensorSelection.LeftOrRight, Comparison.GreaterOrEqual, 70, AfterMotion.BreakStop)
    levelings.lineAlignment(VerticalLineLocation.Front, 750, params.lineAlignmentSevenParams(50, 1.1, 1.1, 0, 0))
    chassis.linearDistMove(40, 50, Braking.Hold)
    chassis.spinTurn(90, 80)
    UpClawAfterDelayInParallel(1500, 50)
    motions.rampLineFollowToDistance(450, 110, 50, Braking.NoStop, params.rampLineFollowSixParams(30, 90, 70, 0.5, 0.5))
    motions.lineFollowToCrossIntersection(AfterMotion.NoStop, params.lineFollowFourParams(70, 0.5, 0.5))
    control.runInParallel(function () {
        pause(2500)
        custom.LinearMotor(LinearMotorPos.Left, 50, MotorBreak.NoHold, 100)
    })
    chassis.decelFinishLinearDistMove(70, 10, 50, 150)
    pause(50)
    chassis.accelStartLinearDistMove(-20, -70, 50)
    motions.moveToRefZone(0, -70, LineSensorSelection.LeftOrRight, Comparison.LessOrEqual, 40, AfterMotion.BreakStop)
    pause(50)
    chassis.rampLinearDistMove(20, 60, 10, 40, 20, 20)
    pause(50)
    chassis.spinTurn(-180, 70)
}
brick.buttonLeft.onEvent(ButtonEvent.Pressed, function () {
    sensors.searchRgbMinMax(sensors.color3)
})
brick.buttonDown.onEvent(ButtonEvent.Bumped, function () {
    chassis.spinTurn(90, 50)
})
// Часть 3 - перевести первый спутник
function MoveSatellite5 () {
    chassis.setBrakeSettleTime(110)
    motions.rampLineFollowToDistance(100, 60, 40, Braking.Hold, params.rampLineFollowThreeParams(30, 70, 10))
    chassis.spinTurn(90, 60)
    pause(50)
    chassis.linearDistMove(20, -40, Braking.NoStop)
    levelings.lineAlignment(VerticalLineLocation.Behind, 750, params.lineAlignmentSevenParams(55, 1.1, 1.1, 0, 0))
    chassis.linearDistMove(40, 40, Braking.NoStop)
    chassis.linearDistMove(67, 60, Braking.Hold)
    chassis.pivotTurn(90, 90, WheelPivot.LeftWheel)
    chassis.linearDistMove(205, 60, Braking.Hold)
    current_color = -1
    for (let index4 = 0; index4 <= 4; index4++) {
        setellite_zone = index4 + 1
        custom.Claw(ClawState2.Down, 60, MotorBreak.NoHold, 100)
        chassis.linearDistMove(30, -50, Braking.Hold)
        pause(50)
        music.playSoundEffect(sounds.informationAnalyze)
        chassis.linearDistMove(30, 50, Braking.Hold)
        pause(50)
        current_color = CheckSetelliteColor()
        brick.printValue("current_color", current_color, 11)
        if (current_color != 0) {
            custom.VoiceSatelliteColor(current_color, VoiceActing.ExpectEnd)
            break;
        } else {
            music.playSoundEffectUntilDone(sounds.communicationNo)
            custom.Claw(ClawState2.Up, 60, MotorBreak.NoHold, 100)
            pause(50)
            chassis.spinTurn(4, 50)
            chassis.linearDistMove(158, 50, Braking.Hold)
        }
    }
    chassis.linearDistMove(20, 60, Braking.Hold)
    chassis.pivotTurn(90, 60, WheelPivot.LeftWheel)
    motions.lineFollowToCrossIntersection(AfterMotion.DecelRolling)
    chassis.spinTurn(90, 60)
    if (false) {
        chassis.linearDistMove(150, 65, Braking.Hold)
    }
    motions.rampLineFollowToDistance(900 - 150 * (setellite_zone - 1), 150, 0, Braking.NoStop, params.rampLineFollowThreeParams(30, 70, 50))
    motions.lineFollowToSideIntersection(SideIntersection.LeftInside, AfterMotion.DecelRolling, params.lineFollowFourParams(65, 0.6, 0))
    pause(50)
    motions.setSteeringAtSearchLineForLineFollowOneSensor(15)
    motions.lineFollowToSideIntersection(SideIntersection.LeftInside, AfterMotion.DecelRolling, params.lineFollowFourParams(55, 0.6, 0))
    chassis.spinTurn(-90, 60)
    motions.lineFollowToCrossIntersection(AfterMotion.NoStop, params.lineFollowFourParams(70, 0.5, 0))
    chassis.decelFinishLinearDistMove(70, 50, 130, 280)
    chassis.spinTurn(-90, 60)
    chassis.rampLinearDistMove(30, 80, 10, 310, 75, 100)
    control.runInParallel(function () {
        custom.LinearMotor(LinearMotorPos.Left, 60, MotorBreak.NoHold, 100)
    })
    if (current_color == 6) {
        need_cross = 0
    } else if (current_color == 3) {
        need_cross = 1
    } else if (current_color == 2) {
        need_cross = 2
    } else if (current_color == 4) {
        need_cross = 3
    } else if (current_color == 5) {
        need_cross = 4
    }
    if (false) {
        motions.lineFollowToDistance(40, AfterMotion.NoStop, params.lineFollowTwoParams(40, 0.6))
    }
    motions.setSteeringAtSearchLineForLineFollowOneSensor(30)
    for (let index23 = 0; index23 <= need_cross; index23++) {
        if (index23 != need_cross) {
            motions.lineFollowToSideIntersection(SideIntersection.RightInside, AfterMotion.RollingNoStop, params.lineFollowTwoParams(50, 0.7))
        } else {
            motions.lineFollowToSideIntersection(SideIntersection.RightInside, AfterMotion.DecelRolling, params.lineFollowTwoParams(50, 0.7))
        }
    }
    control.runInParallel(function () {
        custom.Claw(ClawState2.Up, 65, MotorBreak.NoHold, 100)
    })
    chassis.spinTurn(90, 70)
    motions.lineFollowToDistance(90, AfterMotion.BreakStop, params.lineFollowFourParams(45, 0.5, 0.5))
    chassis.spinTurn(12, 50)
    chassis.spinTurn(-10, 50)
    chassis.linearDistMove(85, -45, Braking.Hold)
}
// Вспомогательная функция проверки цвета спутника
function CheckSetelliteColor () {
    result_color = -1
    color_samples = [-1]
    color_check_time = 100
    control.timer1.reset()
    control.runInParallel(function () {
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
// Отпустить захват после задержки в параллельной задаче
function DownClawAfterDelayInParallel (delay: number, speed: number) {
    control.runInParallel(function () {
        pause(delay)
        music.playSoundEffect(sounds.informationUp)
        custom.Claw(ClawState2.Down, speed, MotorBreak.NoHold)
    })
}
// Запустить ракету
function MoveRocket () {
    chassis.setBrakeSettleTime(150)
    chassis.rampLinearDistMove(-30, -70, -10, 170, 70, 70)
    chassis.spinTurn(90, 70)
    chassis.rampLinearDistMove(-30, -60, -10, 40, 20, 20)
    levelings.lineAlignment(VerticalLineLocation.Front, 650, params.lineAlignmentSevenParams(50, 1.1, 1.1, 0, 0))
    chassis.rampLinearDistMove(-30, -50, -10, 20, 10, 10)
    chassis.pivotTurn(162, -70, WheelPivot.LeftWheel)
    custom.LinearMotor(LinearMotorPos.Right, 50, MotorBreak.NoHold)
    chassis.linearDistMove(50, 35, Braking.NoStop)
    chassis.linearDistMove(380, 35, Braking.Hold)
    chassis.linearDistMove(50, 40, Braking.NoStop)
    chassis.linearDistMove(60, 40, Braking.NoStop)
    chassis.linearDistMove(40, -50, Braking.Hold)
    custom.LinearMotor(LinearMotorPos.Left, 30, MotorBreak.NoHold, 100)
}
// Поднять захват после задержки в параллельной задаче
function UpClawAfterDelayInParallel (delay: number, speed: number) {
    control.runInParallel(function () {
        pause(delay)
        music.playSoundEffect(sounds.informationUp)
        custom.Claw(ClawState2.Up, speed, MotorBreak.NoHold)
    })
}
// Часть 4 - отвезти последний красный кубик0
function MoveLastRedSpaceGarbage () {
    chassis.setBrakeSettleTime(75)
    chassis.spinTurn(-90, 70)
    pause(25)
    for (let index = 0; index <= 4 - need_cross; index++) {
        if (index == 3) {
            motions.lineFollowToSideIntersection(SideIntersection.RightInside, AfterMotion.BreakStop, params.lineFollowFourParams(55, 0.9, 0.5))
        } else {
            motions.lineFollowToSideIntersection(SideIntersection.RightInside, AfterMotion.RollingNoStop, params.lineFollowFourParams(55, 0.9, 0.5))
        }
    }
    pause(25)
    chassis.rampLinearDistMove(30, 60, 10, 110, 20, 50)
    pause(50)
    chassis.spinTurn(-90, 50)
    chassis.linearDistMove(80, 60, Braking.Hold)
    custom.Claw(ClawState2.Down, 50, MotorBreak.NoHold)
    chassis.linearDistMove(70, -60, Braking.Hold)
    pause(50)
    chassis.spinTurn(-90, 70)
    pause(50)
    motions.rampLineFollowToDistance(220, 120, 100, Braking.NoStop, params.rampLineFollowSixParams(30, 80, 70, 0.5, 0.5))
    motions.lineFollowToCrossIntersection(AfterMotion.NoStop, params.lineFollowFourParams(70, 0.5, 0.5))
    chassis.decelFinishLinearDistMove(70, 10, 5, 120)
    pause(50)
    chassis.spinTurn(90, 60)
    pause(50)
    chassis.accelStartLinearDistMove(30, 70, 50, 150)
    motions.moveToRefZone(0, 70, LineSensorSelection.LeftOrRight, Comparison.GreaterOrEqual, 80, AfterMotion.BreakStop)
    motions.moveToRefZone(0, 70, LineSensorSelection.LeftOrRight, Comparison.LessOrEqual, 20, AfterMotion.BreakStop)
    if (true) {
        motions.moveToRefZone(0, 70, LineSensorSelection.LeftOrRight, Comparison.GreaterOrEqual, 80, AfterMotion.BreakStop)
        levelings.lineAlignment(VerticalLineLocation.Behind, 750, params.lineAlignmentSevenParams(50, 1.1, 1.1, 0, 0))
    }
    chassis.linearDistMove(30, 60, Braking.Hold)
    pause(50)
    chassis.spinTurn(90, 70)
    pause(50)
    UpClawAfterDelayInParallel(2000, 50)
    control.runInParallel(function () {
        custom.LinearMotor(LinearMotorPos.Right, 50, MotorBreak.NoHold, 100)
        pause(3400)
        custom.LinearMotor(LinearMotorPos.Left, 50, MotorBreak.NoHold, 100)
    })
    motions.rampLineFollowToDistance(220, 100, 50, Braking.NoStop, params.rampLineFollowSixParams(30, 80, 70, 0.5, 0.5))
    motions.lineFollowToCrossIntersection(AfterMotion.NoStop, params.lineFollowFourParams(70, 0.55, 0.5))
    chassis.decelFinishLinearDistMove(70, 10, 50, 90)
    pause(100)
    motions.moveToRefZone(0, -65, LineSensorSelection.LeftOrRight, Comparison.LessOrEqual, 40, AfterMotion.BreakStop)
    pause(100)
    chassis.rampLinearDistMove(30, 50, 10, 45, 20, 20)
    pause(75)
    chassis.spinTurn(-180, 70)
}
// Часть 1 - перевести аккумулятор
function TransferRocketFuel () {
    chassis.setBrakeSettleTime(75)
    chassis.rampLinearDistMove(30, 80, 10, 145, 50, 50)
    custom.Claw(ClawState2.Down, 30, MotorBreak.NoHold, 100)
    chassis.linearDistMove(50, -70, Braking.Hold)
    chassis.spinTurn(90, 80)
    if (false) {
        chassis.rampLinearDistMove(30, 60, 10, 120, 100, 50)
        levelings.linePositioning(100, params.linePositioningAllParams(500, 50, 0.6, 0, 0))
        motions.rampLineFollowToDistance(1670, 170, 0, Braking.NoStop, params.rampLineFollowSixParams(40, 90, 70, 0.6, 0.8))
        chassis.linearDistMove(85, 70, Braking.Hold)
    } else {
        chassis.accelStartLinearDistMove(30, 50, 120)
        control.runInParallel(function () {
            pause(500)
            custom.LinearMotor(LinearMotorPos.Left, 40, MotorBreak.NoHold)
        })
        UpClawAfterDelayInParallel(1500, 1)
        motions.rampLineFollowToDistance(1670, 160, 50, Braking.NoStop, params.rampLineFollowSixParams(50, 90, 70, 0.6, 0.8))
        chassis.decelFinishLinearDistMove(70, 10, 50, 125)
    }
}
let color_check_time = 0
let color_samples: number[] = []
let result_color = 0
let setellite_zone = 0
let current_color = 0
let need_cross = 0
let color = 0
let hsvl: number[] = []
let rgb: number[] = []
brick.showImage(images.expressionsSwearing)
chassis.setChassisMotors(motors.mediumB, motors.mediumC, true, false)
chassis.setSyncRegulatorGains(0.02, 0.001, 0.5)
chassis.setWheelDiametr(62.4, MeasurementUnit.Millimeters)
chassis.setBaseLength(168, MeasurementUnit.Millimeters)
sensors.setNxtLightSensorsAsLineSensors(sensors.nxtLight1, sensors.nxtLight4)
sensors.setLineSensorsRawRefValues(2240, 1680, 2500, 1972)
sensors.setColorSensorMinRgbValues(sensors.color3, 3, 3, 3)
sensors.setColorSensorMaxRgbValues(sensors.color3, 98, 87, 95)
// * Значения перевода HSVL в цветовые коды.
// * значение границы цветности S, если значение S выше, тогда объект будет считаться цветным иначе чёрно-белым (или что ничего нет), eg: 50
// * значение границы белого V, если значение V ≥ этому, тогда объект будет считаться белым, eg: 10
// * значение границы чёрного V, если значение ≥ этому числу, но меньше белого числа, тогда будет считаться чёрным цветом, а всё что ниже этого будет считаться, что цвета нет, eg: 1
// * значение границы красного H, от 0 до этого значения, eg: 25
// * значение границы коричневого H, от красного до этого значения, eg: 40
// * значение границы жёлтого H, от коричневого до этого значения, eg: 100
// * значение границы зелёного H, от жёлтого до этого значения, eg: 180
// * значение границы синего H, от зелёного до этого значения, а после до 360 (включительно) снова идёт красный, eg: 260
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
motions.setLineFollowConditionMaxErr(60)
motions.setLineFollowLoopDt(1)
levelings.setLineAlignmentOrPositioningLoopDt(1)
motions.setSteeringAtSearchLineForLineFollowOneSensor(55)
motors.mediumD.setInverted(false)
custom.Claw(ClawState2.Up, 50, MotorBreak.NoHold, 100)
sensors.color3.pauseUntilColorDetected(ColorSensorColor.None)
brick.printValue("V", brick.batteryInfo(BatteryProperty.Voltage), 1)
// Индикатор начала проги
brick.setStatusLight(StatusLight.GreenPulse)
// Ждать нажатие центральной клавиши
brick.buttonEnter.pauseUntil(ButtonEvent.Bumped)
// Индикатор выключаем
brick.setStatusLight(StatusLight.Off)
brick.clearScreen()
if (false) {
    while (true) {
        GetColor(true)
        pause(10)
    }
}
if (true) {
    pause(100)
    TransferRocketFuel()
}
if (true) {
    pause(100)
    MoveRocket()
}
if (true) {
    pause(100)
    MoveTwoRedGarbageCubes()
}
if (true) {
    pause(100)
    MoveSatellite()
}
if (true) {
    pause(100)
    MoveLastRedSpaceGarbage()
}
