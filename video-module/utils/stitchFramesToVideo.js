import ffmpeg from 'fluent-ffmpeg';

export async function stitchFramesToVideo(
    framesFilepath,
    soundtrackFilePath,
    outputFilepath,
    duration,
    frameRate,
) {

    console.log(duration);
    await new Promise((resolve, reject) => {
        let command = ffmpeg();

        // Tell FFmpeg to stitch all images together in the provided directory
        command.input(framesFilepath);
        command.inputOptions([
            // Set input frame rate
            `-framerate ${frameRate}`,
        ]);

        command.videoCodec('libx264');
        command.outputOptions('-pix_fmt yuv420p')



        // Set the output duration. It is required because FFmpeg would otherwise
        // automatically set the duration to the longest input, and the soundtrack might
        // be longer than the desired video length
        command.duration(duration);
        // Set output frame rate
        command.fps(frameRate);




        // Add the soundtrack
        command.input(soundtrackFilePath)

        // Resolve or reject (throw an error) the Promise once FFmpeg completes
        command.saveToFile(outputFilepath);
        command.on('end', () => resolve());
        command.on('error', (error) => reject(new Error(error)));

        // console.log(command);
    });
}


// `-framerate ${frameRate}`, `afade=out:st=${duration - 10}:d=2`, '-pix_fmt yuv420p', duration frameRate outputFilepath