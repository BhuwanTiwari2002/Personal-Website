const container = document.getElementById('threejsModel');
const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        const ambientLighting = new THREE.AmbientLight(0xffffff, 1);

        //renderer.setSize(800, 512);
        addEventListener("resize", (event) => {
            renderer.setSize(container.offsetWidth, container.offsetHeight);
        });
        renderer.setSize(container.offsetWidth, container.offsetHeight);

      
        container.appendChild(renderer.domElement);
        //document.body.appendChild(renderer.domElement);
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
           // gltf.scene.rotation.z = 2;
           // gltf.scene.rotation.x += 0.01;
        // Request the next frame of the animation
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

        // Set up orbit control
        //var controls = new THREE.OrbitControls(camera, renderer.domElement);
        scene.background = new THREE.Color('#f8ede3');
        var controls = new THREE.OrbitControls(camera, renderer.domElement);
        // Render loop
        var animate = function () {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();
        