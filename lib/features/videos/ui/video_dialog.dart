import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';

/// Lightweight fullscreen-ish video player dialog.
///
/// Replaces the old `chewie` dependency (which called `dart:io Platform` and
/// broke the `--wasm` build). Accepts either a bundled asset path or an http(s)
/// URL. The controller is owned by this widget and disposed with it.
class VideoDialog extends StatefulWidget {
  const VideoDialog({super.key, required this.url});

  final String url;

  @override
  State<VideoDialog> createState() => _VideoDialogState();
}

class _VideoDialogState extends State<VideoDialog> {
  late final VideoPlayerController _controller;

  @override
  void initState() {
    super.initState();
    _controller = widget.url.startsWith('http')
        ? VideoPlayerController.networkUrl(Uri.parse(widget.url))
        : VideoPlayerController.asset(widget.url);
    _controller
      ..setLooping(true)
      ..addListener(_refresh)
      ..initialize().then((_) {
        if (!mounted) return;
        _controller.play();
        setState(() {});
      });
  }

  void _refresh() {
    if (mounted) setState(() {});
  }

  @override
  void dispose() {
    _controller.removeListener(_refresh);
    _controller.dispose();
    super.dispose();
  }

  void _togglePlay() {
    _controller.value.isPlaying ? _controller.pause() : _controller.play();
  }

  @override
  Widget build(BuildContext context) {
    final ready = _controller.value.isInitialized;
    return Dialog(
      backgroundColor: Colors.black,
      insetPadding: const EdgeInsets.all(24),
      child: Stack(
        alignment: Alignment.center,
        children: [
          AspectRatio(
            aspectRatio: ready ? _controller.value.aspectRatio : 16 / 9,
            child: ready
                ? GestureDetector(
                    onTap: _togglePlay,
                    child: Stack(
                      alignment: Alignment.center,
                      children: [
                        VideoPlayer(_controller),
                        if (!_controller.value.isPlaying)
                          const Icon(Icons.play_arrow_rounded,
                              size: 72, color: Colors.white70),
                        Positioned(
                          left: 0,
                          right: 0,
                          bottom: 0,
                          child: VideoProgressIndicator(
                            _controller,
                            allowScrubbing: true,
                          ),
                        ),
                      ],
                    ),
                  )
                : const Center(child: CircularProgressIndicator()),
          ),
          Positioned(
            top: 10,
            right: 10,
            child: InkWell(
              onTap: () => Navigator.pop(context),
              child: Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: Colors.red,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(Icons.close, color: Colors.black),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
