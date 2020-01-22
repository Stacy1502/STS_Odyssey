'use strict';

AFRAME.registerComponent('circles-inspect-object', {
  schema: {
    title:            {type:'string',   default:'No Title Set'},
    description:      {type:'string',   default:'No decription set'},
    inspectScale:     {type:'vec3',     default:{x:1.0, y:1.0, z:1.0}},
    inspectRotation:  {type:'vec3',     default:{x:0.0, y:0.0, z:0.0}},
    origPos:          {type:'vec3',     default:{x:10001.0, y:0.0, z:0.0}},
    origRot:          {type:'vec3',     default:{x:10001.0, y:0.0, z:0.0}},
    origScale:        {type:'vec3',     default:{x:10001.0, y:0.0, z:0.0}},
    textRotationY:    {type:'number',   default:0.0},                 //rotation of textual info
    textLookAt:       {type:'boolean',  default:false}               //will we do a look at to rotate to where user is at first?
  },
  init: function() {
    const Context_AF = this;
    const data = this.data;
    Context_AF.highlight_object = null;

    Context_AF.el.addEventListener(CIRCLES.EVENTS.OBJECT_HIGHLIGHT_LOADED, (e) => {
        Context_AF.highlight_object = e.target;
    });

    if (data.origPos.x > 10000) {
      Context_AF.el.setAttribute('circles-inspect-object', {origPos:{x:Context_AF.el.object3D.position.x, y:Context_AF.el.object3D.position.y, z:Context_AF.el.object3D.position.z}}); //save it so network syncs this
    }

    if (data.origRot.x > 10000) {
      Context_AF.el.setAttribute('circles-inspect-object', {origRot:{x:Context_AF.el.object3D.rotation.x, y:Context_AF.el.object3D.rotation.y, z:Context_AF.el.object3D.rotation.z}}); //save it so network syncs this
    }

    if (data.origScale.x > 10000) {
      Context_AF.el.setAttribute('circles-inspect-object', {origScale:{x:Context_AF.el.object3D.scale.x, y:Context_AF.el.object3D.scale.y, z:Context_AF.el.object3D.scale.z}}); //save it so network syncs this
    }
    
    // NAF.utils.getNetworkedEntity(Context_AF.el).then((el) => {
      Context_AF.el.addEventListener('ownership-gained', (e) => {
          Context_AF.el.emit( CIRCLES.EVENTS.OBJECT_OWNERSHIP_GAINED, Context_AF.el, true );
        });

        Context_AF.el.addEventListener('ownership-lost', (e) => {
          // Context_AF.el.removeAttribute('circles-parent-constraint');
          Context_AF.el.emit( CIRCLES.EVENTS.OBJECT_OWNERSHIP_LOST, Context_AF.el, true );
        });

        Context_AF.el.addEventListener('ownership-changed', (e) => {
          Context_AF.el.emit( CIRCLES.EVENTS.OBJECT_OWNERSHIP_CHANGED, Context_AF.el, true );
        });
    // });

    //send click event to manager
    Context_AF.el.addEventListener('click', (e) => {
          Context_AF.el.emit( CIRCLES.EVENTS.SELECT_THIS_OBJECT, this, true );
    });
  },
  update : function(oldData) 
  {}
});