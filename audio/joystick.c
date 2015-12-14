/*
<generator>
	<handlers init="init" initGet="initGet" doGet="doGet"/>
	<properties persitence="volatile" channel="joystickChannel"/>
	<args>
		<arg name="joystick" type="uint16" />
	</args>
</generator>
*/

#include <stdio.h>

#include "generators.h"
#include "timers.h"
#include "channels.h"

static uint16_t glob_load;
static uint16_t oldjoystick;
static uint16_t joystick;

static void timer() {
	if(rflpc_gpio_get_pin(MBED_DIP12)){
		joystick = 2;
	}
	else if(rflpc_gpio_get_pin(MBED_DIP13)){
		joystick = 4;
	}
	else if(rflpc_gpio_get_pin(MBED_DIP14)){
		joystick = 5;
	}
	else if(rflpc_gpio_get_pin(MBED_DIP15)){
		joystick = 8;
	}
	else if(rflpc_gpio_get_pin(MBED_DIP16)){
		joystick = 6;
	}
	else{
		joystick = 0;
	}
	if(joystick != oldjoystick){
		glob_load = (uint16_t)joystick;
		rflpc_led_set(RFLPC_LED_1);
		server_push(&joystickChannel);
	}
}

static char init(void) {
	rflpc_pin_set(MBED_DIP12, 0, RFLPC_PIN_MODE_RESISTOR_PULL_DOWN, 0);
    rflpc_pin_set(MBED_DIP13, 0, RFLPC_PIN_MODE_RESISTOR_PULL_DOWN, 0);
    rflpc_pin_set(MBED_DIP14, 0, RFLPC_PIN_MODE_RESISTOR_PULL_DOWN, 0);
    rflpc_pin_set(MBED_DIP15, 0, RFLPC_PIN_MODE_RESISTOR_PULL_DOWN, 0);
    rflpc_pin_set(MBED_DIP16, 0, RFLPC_PIN_MODE_RESISTOR_PULL_DOWN, 0);
    rflpc_led_init();
	return set_timer(&timer,100);
}

static char initGet(struct args_t *args) {
	if(args)
		oldjoystick = args->joystick;
	return 1;
}

static char doGet(struct args_t *args) {
	out_uint(glob_load);
	return 1;
}
