const container = document.getElementById('threejsModel');      
const preferredColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        const ambientLighting = new THREE.AmbientLight(0xffffff, 1);

        //renderer.setSize(800, 512);
        addEventListener("resize", (event) => {
            renderer.setSize(window.innerWidth/1.8, window.innerHeight/1.8);
        });
        renderer.setSize(window.innerWidth/1.8, window.innerHeight/1.8);
      
        container.appendChild(renderer.domElement);

        
        // Load the GLTF loader
        var loader = new THREE.GLTFLoader();
        scene.add(ambientLighting);
        // Load the .glb file
        loader.load(
            '/Media/Dog/dog.glb',
            function ( gltf ) {
            // Add the loaded object to the scene
            scene.add(gltf.scene);
            // Set the initial rotation of the model
            gltf.scene.rotation.y = Math.PI / 2;
            // Create a function to update the rotation of the model
            function updateRotation() {
            // Increment the rotation by a small amount
            gltf.scene.rotation.y += 0.025;
        requestAnimationFrame(updateRotation);
        }

        // Start the animation loop
        updateRotation();
            },
            function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
            },
            function ( error ) {
            console.log( 'An error happened' );
            }
        );

        // Set up the camera and renderer
        camera.position.z = 10;
        camera.position.y = 5;
        camera.position.x = 0;
        renderer.setClearColor('#ffffff');
        
        //Checks weather if it is dark or light mode on user's device
         if (preferredColorScheme === 'dark') {
            scene.background = new THREE.Color('#000000');
         } else {
            scene.background = new THREE.Color('#f8ede3');
        }
    
        // Set up orbit control
        var controls = new THREE.OrbitControls(camera, renderer.domElement);
        //This disable's zoom on the 3d model
        controls.enableZoom = false;

    
        // Render loop
        var animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
            