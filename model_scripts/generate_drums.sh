sudo rm /tmp/drums_rnn/generated/*

drums_rnn_generate \
    --config=drum_kit \
    --run_dir=/tmp/drums_rnn/logdir/run1 \
    --hparams="batch_size=128,rnn_layer_sizes=[256,256,256]" \
    --output_dir=/tmp/drums_rnn/generated \
    --num_outputs=1 \
    --num_steps=128 \
    --primer_drums="[(36,)]"

sudo cp /tmp/drums_rnn/generated/* ./generated/drums/