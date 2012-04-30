enable_keyhook = true;

common_key = {};
common_key.set_cursor = function(sobj, cobj) {
    var old = sobj.cursor;
    if (old == cobj){
        return;
    }
    if (old) {
        if (old.leave_focus)
            old.leave_focus (old);
        old.in_cursor = false;
        old.toggle_cursor = false;
    }
    if (cobj) {
        if (cobj.enter_focus)
            cobj.enter_focus (cobj);
        cobj.in_cursor = true;
    }
    sobj.cursor = cobj;
};


/////An array used to store the colour code of the colours of the cards/////
var color = [
"images/card_1.png",
"images/card_2.png",
"images/card_3.png",
"images/card_4.png",
"images/card_5.png",
"images/card_6.png",
"images/card_7.png",
"images/card_8.png"
];

/////A function used to shuffle the cards/////
var shuffle = function(o) {
    for (var j, x, i = o.length; i;
        j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);

    return o;
}


function card(param) {
    this.current_card = param.index;
    this.translate = param.translate;

    /////Components of "card" prototype are defined in here/////
    this.components = [
    this.card = new gimage({
        width: 80,
        height: 100,
        src: param.src,
        visible_p: false
    }),
    this.frame = new gimage({
        width: 92,
        height: 112,
        src: "images/frame.png",
        drawtype: INSCRIBED,
        visible_p: false
    })
    ];
}

card.prototype = new container({ });

card.prototype.free = function() {
    this.visible_p = false;
    this.frame.src = "";
};

card.prototype.enter_focus = function() {
    this.frame.visible_p = true;
};

card.prototype.leave_focus = function() {
    this.frame.visible_p = false;
};




game_board = new container({ visible_p:true });

game_board.create = function() 
{

 /////If components of "game_board" object have been created, this function will return/////
 ///// after this line of code to prevent re-creation of components/////
    if (this.components.length > 0) return;

    /////Components of "game_board" object are defined in here/////
    this.components = 
    [
        this.bg = new gbox ({
            width: 1920,
            height: 1080,
            translate: [0, 0, 0],
            color: [195, 195, 195, 255]
        }),
        this.logo = new gimage({
            width: 200,
            height: 80,
            translate: [220, 200, 0],
            src: "images/logo.png",
            drawtype: INSCRIBED
        }),
        this.pair_left_lbl = new gtext ({
            width: 200,
            text: "Pair left:",
            translate: [230, 50, 0],
            color: [255, 0, 0, 255],
            align: LEFT
        }),
        this.pair_left = new gtext ({
            width: 40,
            text: "8",
            translate: [270, 50, 0],
            color: [255, 0, 0, 255],
            align: RIGHT
        }),
        this.score_lbl = new gtext ({
            width: 200,
            text: "Score:",
            translate: [230, 0, 0],
            color: [255, 0, 0, 255],
            align: LEFT
        }),
        this.score = new gtext ({
            width: 50,
            text: "0",
            translate: [265, 0, 0],
            color: [255, 0 ,0 ,255],
            align: RIGHT
        }), 
        
        
        this.shadow = new gbox ({
            width: 1920,
            height: 1080,
            translate: [0, 0, 1],
            color: [0, 0, 0, 200],
            visible_p: false
        }),
        
        this.message = new gtextbox ({
            width: 800,
            height: 400,
            translate: [0, 0, 1],
            color: [255, 255 ,255 ,255],
            font_size: 35,
            align: CENTER
        })        
    ];

    /////For-loop is used to create the background of the 16 cards/////
    var x = -280, y = 180;

    for (var i = 0; i < 16; i++) 
    {
        this.components.push(new gimage({
            width: 80,
            height: 100,
            translate: [x, y, 0],
            src: "images/card_bg.png"
        }))

        if (i%4 == 3) {
            x = -280;
            y-= 120;
        }
        else
            x += 100;
    }
    
    /////The container used to store the "card" prototype instances/////
    this.cards = new container({
        visible_p: true
    })

    /////Add the newly created container into its components array/////
    this.components.push(this.cards);
}


game_board.appear = function() {
    this.create();
    this.set_data();
};

game_board.disappear = function() {
    this.visible_p = false;
    this.free();
};

game_board.set_data = function() 
{
    this.card_array = new Array();
    this.selectedCard_array = new Array();
    this.current_card = 0;
    this.card_selected = 0;
    this.first_card = 0;
    this.second_card = 0;
    this.remain = 8;
    this.score_text = 0;
    this.timer = {};

    this.card_array = shuffle(
     [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

    var x = -280, y = 180;

    for (var i = 0; i < 16; i++) {
        if (this.card_array[i] > 8)
            this.cards.components.push(new card({
                index:i,
                translate: [x , y , 0],
                src: color[(this.card_array[i]-8)-1]
            }));
        else
            this.cards.components.push(new card({
                index:i,
                translate: [x , y , 0],
                src: color[this.card_array[i]-1]
            }));

        if (i%4 == 3) {
            x = -280;
            y-= 120;
        }
        else
            x += 100;
    }

    setf_text(this.pair_left, "" + this.remain);
    setf_text(this.score, "" + this.score_text);
};


game_board.free = function() {
    this.logo.src = "";
    setf_text(this.pair_left_lbl, "");
    setf_text(this.pair_left, "");
    setf_text(this.score_lbl, "");
    setf_text(this.score, "");

    for (var i = 0; i < 16; i++)
        this.cards.components[i].free();
};

game_board.enter_focus = function() {
    common_key.set_cursor(this, this.cards.components[0]);
};

game_board.leave_focus = function() {
    common_key.set_cursor(this, null);
};

game_board.key_hook = function(obj, up_down, key) {
    if (up_down != KEY_PRESS) return true;

    switch(key) {
        case TXK_ENTER:
            if (this.selectedCard_array[this.current_card])
                return true;

            if (this.card_selected == 0) {
                this.first_card = this.current_card;
                this.cards.components[this.current_card].card.visible_p = true;
                this.selectedCard_array[this.first_card] = true;
                this.card_selected = 1;
            }
            else 
            {
                this.second_card = this.current_card;
                this.cards.components[this.current_card].card.visible_p = true;
                this.selectedCard_array[this.second_card] = true;

                if (Math.abs(this.card_array[this.first_card] - this.card_array[this.second_card]) == 8) 
                {
                    enable_keyhook = false;

                    append_timer (this.timer, 1000,
                        function (obj, count) {
                            force_redraw();
                            delete_timer (obj);

                            game_board.cards.components[game_board.first_card].card.src = "images/selected_card.png";
                            game_board.cards.components[game_board.second_card].card.src = "images/selected_card.png";
                            game_board.card_selected = 0;
                            game_board.score_text+=2;
                            game_board.remain--;
                            setf_text(game_board.pair_left, "" + game_board.remain);
                            setf_text(game_board.score, "" + game_board.score_text);


                            if (game_board.remain == 0) {
                                enable_keyhook = false;

                                setf_text(game_board.message, "Bravo Axriste! Teliko score: " + game_board.score_text
                                     + "\nA new game will be started after 5 seconds");
                                game_board.shadow.visible_p = true;
                                game_board.message.visible_p = true;

                                for (var i = 0; i < 16; i++)
                                    game_board.cards.components[i].free();
                                game_board.cards.components = [];

                                append_timer (game_board.timer, 5000,
                                    function (obj, count) {
                                        force_redraw();
                                        delete_timer(obj);

                                        setf_text(game_board.message, "");
                                        game_board.shadow.visible_p = false;
                                        game_board.message.visible_p = false;
                                        game_board.set_data();
                                        common_key.set_cursor(game_board, game_board.cards.components[0]);

                                        enable_keyhook = true;
                                    });
                            }
                            
                            enable_keyhook = true;
                        });
                }
                else {
                    enable_keyhook = false;

                    append_timer (this.timer, 1000,
                        function (obj, count) {
                            force_redraw();
                            delete_timer (obj);

                            game_board.cards.components[game_board.first_card].card.visible_p = false;
                            game_board.cards.components[game_board.second_card].card.visible_p = false;
                            game_board.selectedCard_array[game_board.first_card] = false;
                            game_board.selectedCard_array[game_board.second_card] = false;
                            game_board.card_selected = 0;
                            game_board.score_text--;
                            setf_text(game_board.score, "" + game_board.score_text);

                            enable_keyhook = true;
                        });
                }
            }

            return true;

        case TXK_UP:
            if (this.cards.components[this.current_card-4]) {
                common_key.set_cursor(this, this.cards.components[this.current_card-4]);
                this.current_card-=4;
                return true;
            }

            return true;

        case TXK_DOWN:
            if (this.cards.components[this.current_card+4]) {
                common_key.set_cursor(this, this.cards.components[this.current_card+4]);
                this.current_card+=4;
                return true;
            }

            return true;

        case TXK_LEFT:
            if (this.cards.components[this.current_card-1]) {
                common_key.set_cursor(this, this.cards.components[this.current_card-1]);
                this.current_card-=1;
                return true;
            }

            return true;

        case TXK_RIGHT:
            if (this.cards.components[this.current_card+1]) {
                common_key.set_cursor(this, this.cards.components[this.current_card+1]);
                this.current_card+=1;
                return true;
            }

            return true;
    }
    return false;
};


appli_symbol = "colormemory";

var sobj = stage ({
    "symbol": appli_symbol + "_main",
    "in": [
    {
        "from": ["default"],
        "hook": function(obj){
            game_board.appear();
            common_key.set_cursor(sobj, game_board);
            complete_on_stage(obj);
        }
    },
    ],
    
    "out": [{
        "to": ["default"],
        "hook": function(obj){
            complete_off_stage(obj);
        }
    }
    ],
    
    "bg_image": [ ],
    
    "components": [
                   game_board
                  ],
    
    "key_hook": function (up_down, key) {
    
        if (up_down != KEY_PRESS)
            return false;
        if (!enable_keyhook)
            return true;
        
        if (this.cursor && this.cursor.key_hook && this.cursor.key_hook(this, up_down, key)) {
            force_redraw();
            return true;
        }

        switch (key) {
            case TXK_RETURN:
                exit_appli(0);
                return true;
        }
        return true;
    }         
});

ready_appli();