DOT_MIN = 200
DASH_MIN = 500
LETTER_PAUSE = 1000
LOUD = 200
QUIET = 100
MORSE_TREE = "?ETIANMSURWDKGOHVF?L?PJBXCYZQ??54?3???2???????16???????7???8?91"
morse_index = 0
morse_letter = '?'
morse_new = False
beepBusy = False
beeping = False
beepOn = 0
beepOff = 0

def obey(action):
    basic.show_string(action)

def morse_next(beep):
    global morse_letter
    if beep == 0:
        morse_letter = MORSE_TREE[morse_index]
    else:
        morse_index = (morse_index*2)+beep-1
                    
def beep_check():
    global beepBusy, beeping, beepOn, beepOff
    beep = -1
    if beepBusy:
        if beeping:
            # if input.sound_level() < QUIET:
            if not input.button_is_pressed(Button.A):
                beepOff = control.millis()
                beeping = False
                # analyse length of beep that just stopped
                length = beepOff - beepOn
                if length > DASH_MIN:
                    beep = 2
                elif length > DOT_MIN:
                    beep = 1
            # ...else wait for the beep to stop
        else: # how long since last beep stopped?
            gap = control.millis() - beepOff
            if gap > LETTER_PAUSE:
                beep = 0
                beepBusy = False
            # ...else keep listening for more dots or dashes
    else:
        # if input.sound_level() > LOUD:
        if input.button_is_pressed(Button.A):
            beepOn = control.millis()
            beepBusy = True
    return beep

def on_forever():
    # do all kinds of stuff...
    basic.show_icon(IconNames.HEART)
    # check for morse command
    morse = beep_check()
    if morse > -1:
        morse_next(morse)
    if morse > 0:
        obey(morse_letter)
    basic.pause(20)
    

basic.forever(on_forever)