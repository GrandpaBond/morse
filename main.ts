let DOT_MIN = 200
let DASH_MIN = 500
let LETTER_PAUSE = 1000
let LOUD = 200
let QUIET = 100
let MORSE_TREE = "?ETIANMSURWDKGOHVF?L?PJBXCYZQ??54?3???2???????16???????7???8?91"
let morse_index = 0
let morse_letter = "?"
let morse_new = false
let beepBusy = false
let beeping = false
let beepOn = 0
let beepOff = 0
function obey(action: string) {
    basic.showString(action)
}

function morse_next(beep: number) {
    let morse_index: number;
    
    if (beep == 0) {
        morse_letter = MORSE_TREE[morse_index]
    } else {
        morse_index = morse_index * 2 + beep - 1
    }
    
}

function beep_check(): number {
    let length: number;
    let gap: number;
    
    let beep = -1
    if (beepBusy) {
        if (beeping) {
            //  if input.sound_level() < QUIET:
            if (!input.buttonIsPressed(Button.A)) {
                beepOff = control.millis()
                beeping = false
                //  analyse length of beep that just stopped
                length = beepOff - beepOn
                if (length > DASH_MIN) {
                    beep = 2
                } else if (length > DOT_MIN) {
                    beep = 1
                }
                
            }
            
        } else {
            //  ...else wait for the beep to stop
            //  how long since last beep stopped?
            gap = control.millis() - beepOff
            if (gap > LETTER_PAUSE) {
                beep = 0
                beepBusy = false
            }
            
        }
        
    } else if (input.buttonIsPressed(Button.A)) {
        beepOn = control.millis()
        beepBusy = true
    }
    
    return beep
}

basic.forever(function on_forever() {
    //  do all kinds of stuff...
    basic.showIcon(IconNames.Heart)
    //  check for morse command
    let morse = beep_check()
    if (morse > -1) {
        morse_next(morse)
    }
    
    if (morse > 0) {
        obey(morse_letter)
    }
    
    basic.pause(20)
})
