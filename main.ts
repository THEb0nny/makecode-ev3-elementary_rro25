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
    if (cross == 0) {
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
// Поднять манипулятор после задержки в параллельной задаче
function RaiseClawAfterDelayInParallel (delay: number) {
    control.runInParallel(function () {
        pause(delay)
        music.playSoundEffect(sounds.informationUp)
        custom.Claw(ClawState.Open, 50, MotorBreak.Hold)
    })
}
// Часть 3 - перевести первый спутник
function MoveSatellite () {
    chassis.setBrakeSettleTime(110)
    motions.rampLineFollowToDistance(100, 60, 40, Braking.Hold, params.rampLineFollowThreeParams(30, 70, 10))
    chassis.spinTurn(90, 60)
    pause(50)
    chassis.linearDistMove(20, -40, Braking.NoStop)
    levelings.lineAlignment(VerticalLineLocation.Behind, 750, params.lineAlignmentSevenParams(55, 1.1, 1.1, 0, 0))
    chassis.linearDistMove(40, 40, Braking.NoStop)
    chassis.linearDistMove(67, 60, Braking.Hold)
    chassis.pivotTurn(90, 90, WheelPivot.LeftWheel)
    chassis.linearDistMove(46, 60, Braking.Hold)
    current_color = -1
    for (let index = 0; index <= 4; index++) {
        setellite_zone = index + 1
        custom.Claw(ClawState.Close, 60, MotorBreak.NoHold)
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
            custom.Claw(ClawState.Open, 60, MotorBreak.Hold)
            pause(50)
            chassis.spinTurn(4, 50)
            chassis.linearDistMove(158, 50, Braking.Hold)
        }
    }
    chassis.linearDistMove(20, 60, Braking.Hold)
    chassis.pivotTurn(90, 60, WheelPivot.LeftWheel)
    if (false) {
        chassis.linearDistMove(150, 65, Braking.Hold)
    }
    motions.lineFollowToCrossIntersection(AfterMotion.DecelRolling)
    chassis.spinTurn(90, 60)
    pause(50)
    motions.rampLineFollowToDistance(900 - 150 * (setellite_zone - 1), 150, 0, Braking.NoStop, params.rampLineFollowThreeParams(30, 60, 50))
    motions.setSteeringAtSearchLineForLineFollowOneSensor(15)
    motions.lineFollowToSideIntersection(SideIntersection.LeftInside, AfterMotion.DecelRolling, params.lineFollowFourParams(65, 0.6, 0))
    chassis.spinTurn(-90, 60)
    motions.lineFollowToCrossIntersection(AfterMotion.NoStop, params.lineFollowFourParams(70, 0.5, 0))
    chassis.decelFinishLinearDistMove(70, 50, 130, 275)
    chassis.spinTurn(-90, 60)
    chassis.rampLinearDistMove(30, 80, 10, 310, 75, 100)
    control.runInParallel(function () {
        custom.LinearMotor(LinearMotorPos.Left, 60, MotorBreak.NoHold)
    })
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
    motions.setSteeringAtSearchLineForLineFollowOneSensor(30)
    for (let index2 = 0; index2 <= cross; index2++) {
        if (index2 != cross) {
            motions.lineFollowToSideIntersection(SideIntersection.RightInside, AfterMotion.RollingNoStop, params.lineFollowTwoParams(50, 0.7))
        } else {
            motions.lineFollowToSideIntersection(SideIntersection.RightInside, AfterMotion.DecelRolling, params.lineFollowTwoParams(50, 0.7))
        }
    }
    control.runInParallel(function () {
        motors.mediumA.run(70, -220, MoveUnit.Degrees)
    })
    control.runInParallel(function () {
        custom.Claw(ClawState.Open, 65, MotorBreak.Hold)
    })
    chassis.spinTurn(90, 70)
    motions.lineFollowToDistance(90, AfterMotion.BreakStop, params.lineFollowFourParams(45, 0.5, 0.5))
    chassis.spinTurn(12, 50)
    chassis.spinTurn(-10, 50)
    chassis.linearDistMove(85, -45, Braking.Hold)
}
function MoveTwoRedGarbageCubes () {
    chassis.linearDistMove(55, 60, Braking.Hold)
    chassis.pivotTurn(80, 70, WheelPivot.LeftWheel)
    control.runInParallel(function () {
        pause(1000)
        custom.Claw(ClawState.Close, 35, MotorBreak.NoHold)
    })
    chassis.rampLinearDistMove(40, 80, 10, 425, 150, 50)
    pause(100)
    chassis.spinTurn(-90, 80)
    chassis.steeringCommand(0, -100)
    pause(500)
    chassis.stop()
    RaiseClawAfterDelayInParallel(200)
    control.runInParallel(function () {
        pause(1000)
        custom.Claw(ClawState.Close, 35, MotorBreak.NoHold)
    })
    pause(50)
    chassis.rampLinearDistMove(30, 90, 10, 420, 100, 50)
    chassis.pivotTurn(90, 80, WheelPivot.LeftWheel)
    pause(10)
    chassis.rampLinearDistMove(30, 80, 10, 100, 70, 30)
    chassis.pivotTurn(90, 80, WheelPivot.RightWheel)
    control.runInParallel(function () {
        pause(800)
        custom.LinearMotor(LinearMotorPos.Right, 50, MotorBreak.NoHold)
    })
    motions.moveToRefZone(0, 70, LineSensorSelection.LeftOrRight, Comparison.GreaterOrEqual, 70, AfterMotion.BreakStop)
    levelings.lineAlignment(VerticalLineLocation.Front, 750, params.lineAlignmentSevenParams(50, 1.1, 1.1, 0, 0))
    chassis.linearDistMove(40, 50, Braking.Hold)
    chassis.spinTurn(90, 70)
    RaiseClawAfterDelayInParallel(1500)
    motions.rampLineFollowToDistance(450, 110, 50, Braking.NoStop, params.rampLineFollowSixParams(40, 90, 70, 0.5, 0.5))
    motions.lineFollowToCrossIntersection(AfterMotion.NoStop, params.lineFollowFourParams(70, 0.5, 0.5))
    control.runInParallel(function () {
        pause(2500)
        custom.LinearMotor(LinearMotorPos.Left, 50, MotorBreak.NoHold)
    })
    chassis.decelFinishLinearDistMove(70, 10, 50, 150)
    pause(50)
    motions.moveToRefZone(0, -70, LineSensorSelection.LeftOrRight, Comparison.LessOrEqual, 40, AfterMotion.BreakStop)
    pause(50)
    chassis.linearDistMove(40, 60, Braking.Hold)
    pause(50)
    chassis.spinTurn(-180, 70)
}
// Часть 3 - перевести первый спутник
function MoveSatellite3 () {
    chassis.setBrakeSettleTime(110)
    motions.rampLineFollowToDistance(50, 30, 20, Braking.Hold, params.rampLineFollowThreeParams(30, 70, 10))
    chassis.spinTurn(-90, 60)
    pause(50)
    chassis.linearDistMove(20, -40, Braking.NoStop)
    levelings.lineAlignment(VerticalLineLocation.Behind, 750, params.lineAlignmentSevenParams(55, 1.1, 1.1, 0, 0))
    chassis.linearDistMove(40, 40, Braking.NoStop)
    chassis.linearDistMove(67, 60, Braking.Hold)
    chassis.pivotTurn(90, 90, WheelPivot.RightWheel)
    chassis.linearDistMove(195, 60, Braking.Hold)
    current_color = -1
    for (let index3 = 0; index3 <= 4; index3++) {
        setellite_zone = index3 + 1
        custom.Claw(ClawState.Close, 60, MotorBreak.NoHold)
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
            custom.Claw(ClawState.Open, 60, MotorBreak.Hold)
            pause(50)
            chassis.spinTurn(-4, 50)
            chassis.linearDistMove(158, 50, Braking.Hold)
        }
    }
    chassis.linearDistMove(35, -60, Braking.Hold)
    chassis.spinTurn(25, 70, 666)
    chassis.linearDistMove(35, 50, Braking.Hold)
    chassis.spinTurn(70, 70)
    if (false) {
        chassis.linearDistMove(150, 65, Braking.Hold)
    } else {
        if (true) {
            motions.moveToRefZone(0, 60, LineSensorSelection.LeftAndRight, Comparison.GreaterOrEqual, 80, AfterMotion.NoStop)
        }
        motions.moveToRefZone(0, 60, LineSensorSelection.LeftOrRight, Comparison.LessOrEqual, 20, AfterMotion.NoStop)
        motions.moveToRefZone(0, 60, LineSensorSelection.LeftAndRight, Comparison.GreaterOrEqual, 80, AfterMotion.BreakStop)
        pause(50)
        levelings.lineAlignment(VerticalLineLocation.Behind, 750, params.lineAlignmentSevenParams(50, 1.1, 1.1, 0, 0))
        pause(50)
        chassis.linearDistMove(25, 60, Braking.Hold)
    }
    pause(50)
    motions.setSteeringAtSearchLineForLineFollowOneSensor(16)
    motions.moveToRefZone(0, 60, LineSensorSelection.LeftAndRight, Comparison.GreaterOrEqual, 20, AfterMotion.BreakStop)
    motions.moveToRefZone(0, 60, LineSensorSelection.LeftAndRight, Comparison.GreaterOrEqual, 80, AfterMotion.BreakStop)
    levelings.lineAlignment(VerticalLineLocation.Behind, 750, params.lineAlignmentSevenParams(50, 1.1, 1.1, 0, 0))
    chassis.linearDistMove(25, 60, Braking.Hold)
    chassis.spinTurn(90, 70)
    control.runInParallel(function () {
        custom.LinearMotor(LinearMotorPos.Left, 60, MotorBreak.NoHold)
    })
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
    motions.setSteeringAtSearchLineForLineFollowOneSensor(30)
    for (let index22 = 0; index22 <= cross; index22++) {
        if (index22 != cross) {
            motions.lineFollowToSideIntersection(SideIntersection.RightInside, AfterMotion.RollingNoStop, params.lineFollowTwoParams(50, 0.7))
        } else {
            motions.lineFollowToSideIntersection(SideIntersection.RightInside, AfterMotion.DecelRolling, params.lineFollowTwoParams(50, 0.7))
        }
    }
    control.runInParallel(function () {
        custom.Claw(ClawState.Open, 65, MotorBreak.Hold)
    })
    chassis.spinTurn(90, 70)
    motions.lineFollowToDistance(90, AfterMotion.BreakStop, params.lineFollowFourParams(45, 0.5, 0.5))
    chassis.spinTurn(12, 50)
    chassis.spinTurn(-10, 50)
    chassis.linearDistMove(85, -45, Braking.Hold)
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
        custom.Claw(ClawState.Close, 60, MotorBreak.NoHold)
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
            custom.Claw(ClawState.Open, 60, MotorBreak.Hold)
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
        custom.LinearMotor(LinearMotorPos.Left, 60, MotorBreak.NoHold)
    })
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
    motions.setSteeringAtSearchLineForLineFollowOneSensor(30)
    for (let index23 = 0; index23 <= cross; index23++) {
        if (index23 != cross) {
            motions.lineFollowToSideIntersection(SideIntersection.RightInside, AfterMotion.RollingNoStop, params.lineFollowTwoParams(50, 0.7))
        } else {
            motions.lineFollowToSideIntersection(SideIntersection.RightInside, AfterMotion.DecelRolling, params.lineFollowTwoParams(50, 0.7))
        }
    }
    control.runInParallel(function () {
        custom.Claw(ClawState.Open, 65, MotorBreak.Hold)
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
// Часть 3 - перевести первый спутник
function MoveSatellite2 () {
    chassis.setBrakeSettleTime(110)
    motions.rampLineFollowToDistance(50, 30, 20, Braking.Hold, params.rampLineFollowThreeParams(30, 70, 10))
    chassis.spinTurn(-90, 60)
    pause(50)
    chassis.linearDistMove(20, -40, Braking.NoStop)
    levelings.lineAlignment(VerticalLineLocation.Behind, 750, params.lineAlignmentSevenParams(55, 1.1, 1.1, 0, 0))
    chassis.linearDistMove(40, 40, Braking.NoStop)
    chassis.linearDistMove(67, 60, Braking.Hold)
    chassis.pivotTurn(90, 90, WheelPivot.RightWheel)
    chassis.linearDistMove(47, 60, Braking.Hold)
    current_color = -1
    for (let index5 = 0; index5 <= 4; index5++) {
        setellite_zone = index5 + 1
        custom.Claw(ClawState.Close, 60, MotorBreak.NoHold)
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
            custom.Claw(ClawState.Open, 60, MotorBreak.Hold)
            pause(50)
            chassis.spinTurn(-4, 50)
            chassis.linearDistMove(158, 60, Braking.Hold)
        }
    }
    chassis.linearDistMove(20, 60, Braking.Hold)
    chassis.pivotTurn(90, 70, WheelPivot.LeftWheel)
    motions.lineFollowToCrossIntersection(AfterMotion.DecelRolling)
    chassis.spinTurn(90, 60)
    if (false) {
        chassis.linearDistMove(150, 65, Braking.Hold)
    } else {
        if (true) {
            motions.moveToRefZone(0, 60, LineSensorSelection.LeftAndRight, Comparison.GreaterOrEqual, 80, AfterMotion.NoStop)
        }
        motions.moveToRefZone(0, 60, LineSensorSelection.LeftOrRight, Comparison.LessOrEqual, 20, AfterMotion.NoStop)
        motions.moveToRefZone(0, 60, LineSensorSelection.LeftAndRight, Comparison.GreaterOrEqual, 80, AfterMotion.BreakStop)
        pause(50)
        levelings.lineAlignment(VerticalLineLocation.Behind, 750, params.lineAlignmentSevenParams(50, 1.1, 1.1, 0, 0))
        pause(50)
        chassis.linearDistMove(25, 60, Braking.Hold)
    }
    chassis.spinTurn(90, 70)
    pause(50)
    motions.rampLineFollowToDistance(900 - 150 * (setellite_zone - 1), 150, 0, Braking.NoStop, params.rampLineFollowThreeParams(30, 70, 50))
    motions.setSteeringAtSearchLineForLineFollowOneSensor(15)
    motions.lineFollowToSideIntersection(SideIntersection.LeftInside, AfterMotion.DecelRolling, params.lineFollowFourParams(65, 0.6, 0))
    chassis.spinTurn(-90, 60)
    motions.lineFollowToCrossIntersection(AfterMotion.NoStop, params.lineFollowFourParams(70, 0.5, 0))
    chassis.decelFinishLinearDistMove(70, 50, 130, 280)
    chassis.spinTurn(-90, 60)
    chassis.rampLinearDistMove(30, 80, 10, 310, 75, 100)
    control.runInParallel(function () {
        custom.LinearMotor(LinearMotorPos.Left, 60, MotorBreak.NoHold)
    })
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
    motions.setSteeringAtSearchLineForLineFollowOneSensor(30)
    for (let index24 = 0; index24 <= cross; index24++) {
        if (index24 != cross) {
            motions.lineFollowToSideIntersection(SideIntersection.RightInside, AfterMotion.RollingNoStop, params.lineFollowTwoParams(50, 0.7))
        } else {
            motions.lineFollowToSideIntersection(SideIntersection.RightInside, AfterMotion.DecelRolling, params.lineFollowTwoParams(50, 0.7))
        }
    }
    control.runInParallel(function () {
        custom.Claw(ClawState.Open, 65, MotorBreak.Hold)
    })
    chassis.spinTurn(90, 70)
    motions.lineFollowToDistance(90, AfterMotion.BreakStop, params.lineFollowFourParams(45, 0.5, 0.5))
    chassis.spinTurn(12, 50)
    chassis.spinTurn(-10, 50)
    chassis.linearDistMove(85, -45, Braking.Hold)
}
// Вспомогательная функция, с помощью которой робот трясёт спутник, чтобы правильно прочитать значение цвета
function ShakeSatellite () {
    chassis.spinTurn(5, 50, 1000)
    pause(100)
    chassis.spinTurn(-10, 50, 1000)
    pause(100)
    chassis.spinTurn(5, 50, 1000)
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
function MoveRocket () {
    chassis.setBrakeSettleTime(100)
    pause(100)
    chassis.rampLinearDistMove(-30, -70, -10, 170, 70, 70)
    pause(100)
    chassis.spinTurn(90, 70)
    pause(100)
    chassis.decelFinishLinearDistMove(-60, -30, 20, 40)
    levelings.lineAlignment(VerticalLineLocation.Front, 650, params.lineAlignmentSevenParams(50, 1.1, 1.1, 0, 0))
    chassis.decelFinishLinearDistMove(-50, -20, 10, 20)
    chassis.pivotTurn(162, -70, WheelPivot.LeftWheel)
    custom.LinearMotor(LinearMotorPos.Right, 50, MotorBreak.NoHold)
    chassis.linearDistMove(50, 35, Braking.NoStop)
    chassis.linearDistMove(380, 35, Braking.Hold)
    chassis.linearDistMove(50, 40, Braking.NoStop)
    chassis.linearDistMove(60, 40, Braking.NoStop)
    chassis.linearDistMove(40, -50, Braking.Hold)
    custom.LinearMotor(LinearMotorPos.Left, 30, MotorBreak.NoHold)
}
// Часть 1 - перевести аккумулятор
function TransferRocketGas () {
    chassis.setBrakeSettleTime(75)
    chassis.rampLinearDistMove(30, 80, 10, 145, 50, 50)
    custom.Claw(ClawState.Close, 30, MotorBreak.NoHold)
    chassis.linearDistMove(50, -70, Braking.Hold)
    chassis.spinTurn(90, 80)
    if (false) {
        chassis.rampLinearDistMove(30, 60, 10, 120, 100, 50)
        levelings.linePositioning(100, params.linePositioningAllParams(500, 50, 0.6, 0, 0))
        motions.rampLineFollowToDistance(1670, 170, 0, Braking.NoStop, params.rampLineFollowSixParams(40, 90, 70, 0.6, 0.8))
        chassis.linearDistMove(85, 70, Braking.Hold)
    } else {
        chassis.accelStartLinearDistMove(40, 50, 120)
        control.runInParallel(function () {
            pause(500)
            custom.LinearMotor(LinearMotorPos.Left, 40, MotorBreak.NoHold)
        })
        RaiseClawAfterDelayInParallel(1500)
        motions.rampLineFollowToDistance(1670, 160, 0, Braking.NoStop, params.rampLineFollowSixParams(50, 90, 70, 0.6, 0.8))
        chassis.decelFinishLinearDistMove(70, 10, 50, 125)
    }
}
// Часть 4 - отвезти последний красный кубик0
function MoveLastRedSpaceGarbage () {
    chassis.spinTurn(-90, 70)
    pause(25)
    for (let index32 = 0; index32 <= 4 - cross - 1; index32++) {
        if (index32 == 3) {
            motions.lineFollowToSideIntersection(SideIntersection.RightInside, AfterMotion.BreakStop, params.lineFollowFourParams(55, 0.9, 0.5))
        } else {
            motions.lineFollowToSideIntersection(SideIntersection.RightInside, AfterMotion.RollingNoStop, params.lineFollowFourParams(55, 0.9, 0.5))
        }
    }
    pause(25)
    chassis.linearDistMove(110, 60, Braking.Hold)
    pause(50)
    chassis.spinTurn(-90, 50)
    pause(50)
    chassis.linearDistMove(80, 60, Braking.Hold)
    custom.Claw(ClawState.Close, 50, MotorBreak.Hold)
    chassis.linearDistMove(70, -60, Braking.Hold)
    pause(50)
    chassis.spinTurn(-90, 60)
    pause(50)
    motions.rampLineFollowToDistance(220, 120, 100, Braking.NoStop, params.rampLineFollowFourParams(30, 70, 70, 0.5))
    motions.lineFollowToCrossIntersection(AfterMotion.NoStop, params.lineFollowFourParams(70, 0.5, 0.5))
    chassis.decelFinishLinearDistMove(70, 30, 100, 120)
    pause(50)
    chassis.spinTurn(90, 60)
    pause(50)
    chassis.accelStartLinearDistMove(30, 70, 100, 120)
    motions.moveToRefZone(0, 70, LineSensorSelection.LeftOrRight, Comparison.GreaterOrEqual, 80, AfterMotion.BreakStop)
    motions.moveToRefZone(0, 70, LineSensorSelection.LeftOrRight, Comparison.LessOrEqual, 20, AfterMotion.BreakStop)
    motions.moveToRefZone(0, 70, LineSensorSelection.LeftOrRight, Comparison.GreaterOrEqual, 80, AfterMotion.BreakStop)
    levelings.lineAlignment(VerticalLineLocation.Behind, 750, params.lineAlignmentSevenParams(50, 1.1, 1.1, 0, 0))
    chassis.linearDistMove(30, 60, Braking.Hold)
    pause(50)
    chassis.spinTurn(90, 60)
    pause(50)
    RaiseClawAfterDelayInParallel(2000)
    control.runInParallel(function () {
        pause(3400)
        custom.LinearMotor(LinearMotorPos.Left, 50, MotorBreak.NoHold)
    })
    control.runInParallel(function () {
        custom.LinearMotor(LinearMotorPos.Right, 50, MotorBreak.NoHold)
    })
    motions.rampLineFollowToDistance(220, 100, 0, Braking.NoStop, params.rampLineFollowSixParams(30, 70, 70, 0.5, 0.5))
    motions.lineFollowToCrossIntersection(AfterMotion.NoStop, params.lineFollowFourParams(70, 0.55, 0.5))
    chassis.decelFinishLinearDistMove(50, 15, 50, 90)
    pause(100)
    motions.moveToRefZone(0, -65, LineSensorSelection.LeftOrRight, Comparison.LessOrEqual, 38, AfterMotion.BreakStop)
    chassis.decelFinishLinearDistMove(50, 20, 20, 45)
    pause(50)
    chassis.spinTurn(-180, 70)
}
let color_check_time = 0
let color_samples: number[] = []
let result_color = 0
let setellite_zone = 0
let current_color = 0
let cross = 0
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
custom.Claw(ClawState.Open, 50, MotorBreak.Hold)
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
    TransferRocketGas()
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
if (true) {
    pause(100)
    MoveSatellite5()
}
if (true) {
    pause(100)
    hgfjfmjbdnj()
}
if (true) {
    pause(100)
    MoveSatellite2()
}
if (false) {
    pause(100)
    hgfjfmjbdnj()
}
if (false) {
    pause(100)
    MoveSatellite3()
}
